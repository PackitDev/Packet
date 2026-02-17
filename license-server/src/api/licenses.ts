import { Router, Request, Response } from 'express';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { db, licenses, versions, machineActivations } from '../db/index.js';

const router: Router = Router();

// Validate license
router.post('/validate', async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      key: z.string(),
      version: z.string(),
      product: z.enum(['packet', 'epoxy']).optional(),
    });

    const { key, product } = schema.parse(req.body);

    const license = await db.query.licenses.findFirst({
      where: eq(licenses.key, key),
      with: {
        user: true,
      },
    });

    if (!license) {
      return res.status(404).json({
        valid: false,
        error: 'License not found',
      });
    }

    // Epoxy keys: only accept license with product='epoxy'
    if (product === 'epoxy') {
      const licenseProduct = (license as any).product ?? 'packet';
      if (licenseProduct !== 'epoxy') {
        return res.status(403).json({
          valid: false,
          error: 'This is a Packet license key. Use your Epoxy key from the dashboard.',
        });
      }
    }

    // Packet keys: reject epoxy licenses when product=packet (e.g. CLI)
    if (product === 'packet') {
      const licenseProduct = (license as any).product ?? 'packet';
      if (licenseProduct === 'epoxy') {
        return res.status(403).json({
          valid: false,
          error: 'This is an Epoxy license key. Use your Packet key for the CLI.',
        });
      }
    }

    if (license.status !== 'active') {
      return res.status(403).json({
        valid: false,
        error: 'License is not active',
      });
    }

    const versionInfo = await db.query.versions.findFirst({
      where: eq(versions.version, license.version),
    });

    const maxActivations = product === 'epoxy' ? 3 : 2;

    return res.json({
      valid: true,
      license: {
        key: license.key,
        version: license.version,
        status: license.status,
        isEarlyAccess: license.isEarlyAccess,
        activations: license.activations || 0,
        maxActivations,
      },
      version: versionInfo,
    });
  } catch (error) {
    return res.status(400).json({
      valid: false,
      error: error instanceof Error ? error.message : 'Validation failed',
    });
  }
});

// Activate license
router.post('/activate', async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      key: z.string(),
      machineId: z.string(),
      version: z.string(),
      product: z.enum(['packet', 'epoxy']).optional(),
    });

    const { key, machineId, product } = schema.parse(req.body);

    const license = await db.query.licenses.findFirst({
      where: eq(licenses.key, key),
    });

    if (!license) {
      return res.status(404).json({
        success: false,
        error: 'License not found',
      });
    }

    // Epoxy keys: only accept license with product='epoxy'
    if (product === 'epoxy') {
      const licenseProduct = (license as any).product ?? 'packet';
      if (licenseProduct !== 'epoxy') {
        return res.status(403).json({
          success: false,
          error: 'This is a Packet license key. Use your Epoxy key from the dashboard.',
        });
      }
    }

    // Packet keys: reject epoxy licenses
    if (product === 'packet') {
      const licenseProduct = (license as any).product ?? 'packet';
      if (licenseProduct === 'epoxy') {
        return res.status(403).json({
          success: false,
          error: 'This is an Epoxy license key. Use your Packet key for the CLI.',
        });
      }
    }

    if (license.status !== 'active') {
      return res.status(403).json({
        success: false,
        error: 'License is not active',
      });
    }

    const maxActivations = product === 'epoxy' ? 3 : 2;

    // Check if machine is already activated
    const existingActivation = await db.query.machineActivations.findFirst({
      where: and(
        eq(machineActivations.licenseId, license.id),
        eq(machineActivations.machineId, machineId)
      ),
    });

    if (!existingActivation) {
      // Check activation limit
      const currentActivations = license.activations || 0;
      if (currentActivations >= maxActivations) {
        return res.status(403).json({
          success: false,
          error: `Maximum activations reached (${maxActivations} machines)`,
        });
      }

      // Create new activation
      await db.insert(machineActivations).values({
        licenseId: license.id,
        machineId,
      });

      // Increment activation count
      await db
        .update(licenses)
        .set({ activations: currentActivations + 1 })
        .where(eq(licenses.id, license.id));
    }

    return res.json({
      success: true,
      license: {
        key: license.key,
        version: license.version,
        status: license.status,
        isEarlyAccess: license.isEarlyAccess,
        activations: (license.activations || 0) + (existingActivation ? 0 : 1),
        maxActivations,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Activation failed',
    });
  }
});

// Get accessible versions for a license
router.get('/:key/versions', async (req: Request, res: Response) => {
  try {
    const { key } = req.params;

    const license = await db.query.licenses.findFirst({
      where: eq(licenses.key, key),
    });

    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }

    // Return versions accessible with this license
    const accessibleVersions = [license.version];

    return res.json({ versions: accessibleVersions });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get versions',
    });
  }
});

export default router;

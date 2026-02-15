import { Router } from 'express';
import { eq, and } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { db, licenses, users, versions, machineActivations } from '../db/index.js';

const router = Router();

// Validate license
router.post('/validate', async (req, res) => {
  try {
    const schema = z.object({
      key: z.string(),
      version: z.string(),
    });

    const { key, version } = schema.parse(req.body);

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

    if (license.status !== 'active') {
      return res.status(403).json({
        valid: false,
        error: 'License is not active',
      });
    }

    const versionInfo = await db.query.versions.findFirst({
      where: eq(versions.version, version),
    });

    res.json({
      valid: true,
      license: {
        key: license.key,
        version: license.version,
        status: license.status,
        isEarlyAccess: license.isEarlyAccess,
        activations: license.activations,
        maxActivations: 3,
      },
      version: versionInfo,
    });
  } catch (error) {
    res.status(400).json({
      valid: false,
      error: error instanceof Error ? error.message : 'Validation failed',
    });
  }
});

// Activate license
router.post('/activate', async (req, res) => {
  try {
    const schema = z.object({
      key: z.string(),
      machineId: z.string(),
      version: z.string(),
    });

    const { key, machineId, version } = schema.parse(req.body);

    const license = await db.query.licenses.findFirst({
      where: eq(licenses.key, key),
    });

    if (!license) {
      return res.status(404).json({
        success: false,
        error: 'License not found',
      });
    }

    if (license.status !== 'active') {
      return res.status(403).json({
        success: false,
        error: 'License is not active',
      });
    }

    // Check if machine is already activated
    const existingActivation = await db.query.machineActivations.findFirst({
      where: and(
        eq(machineActivations.licenseId, license.id),
        eq(machineActivations.machineId, machineId)
      ),
    });

    if (!existingActivation) {
      // Check activation limit
      if (license.activations >= 3) {
        return res.status(403).json({
          success: false,
          error: 'Maximum activations reached (3)',
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
        .set({ activations: license.activations + 1 })
        .where(eq(licenses.id, license.id));
    }

    res.json({
      success: true,
      license: {
        key: license.key,
        version: license.version,
        status: license.status,
        isEarlyAccess: license.isEarlyAccess,
        activations: license.activations + (existingActivation ? 0 : 1),
        maxActivations: 3,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Activation failed',
    });
  }
});

// Get accessible versions for a license
router.get('/:key/versions', async (req, res) => {
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

    res.json({ versions: accessibleVersions });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get versions',
    });
  }
});

export default router;

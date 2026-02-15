import { Router, Request, Response } from 'express';
import { eq, desc } from 'drizzle-orm';
import { db, versions } from '../db/index.js';

const router = Router();

// Get current version
router.get('/current', async (_req: Request, res: Response) => {
  try {
    const currentVersion = await db.query.versions.findFirst({
      where: eq(versions.status, 'current'),
      orderBy: [desc(versions.releaseDate)],
    });

    if (!currentVersion) {
      return res.status(404).json({ error: 'No current version found' });
    }

    return res.json({ version: currentVersion.version });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get current version',
    });
  }
});

// Get version status
router.get('/:version/status', async (req: Request, res: Response) => {
  try {
    const { version } = req.params;

    const versionInfo = await db.query.versions.findFirst({
      where: eq(versions.version, version),
    });

    if (!versionInfo) {
      return res.status(404).json({ error: 'Version not found' });
    }

    return res.json({
      status: versionInfo.status,
      features: versionInfo.features,
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get version status',
    });
  }
});

// Get version info
router.get('/:version', async (req: Request, res: Response) => {
  try {
    const { version } = req.params;

    const versionInfo = await db.query.versions.findFirst({
      where: eq(versions.version, version),
    });

    if (!versionInfo) {
      return res.status(404).json({ error: 'Version not found' });
    }

    return res.json(versionInfo);
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get version info',
    });
  }
});

export default router;

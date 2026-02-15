import { Router } from 'express';
import { eq, desc } from 'drizzle-orm';
import { db, versions } from '../db/index.js';

const router = Router();

// Get current version
router.get('/current', async (req, res) => {
  try {
    const currentVersion = await db.query.versions.findFirst({
      where: eq(versions.status, 'current'),
      orderBy: [desc(versions.releaseDate)],
    });

    if (!currentVersion) {
      return res.status(404).json({ error: 'No current version found' });
    }

    res.json({ version: currentVersion.version });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get current version',
    });
  }
});

// Get version status
router.get('/:version/status', async (req, res) => {
  try {
    const { version } = req.params;

    const versionInfo = await db.query.versions.findFirst({
      where: eq(versions.version, version),
    });

    if (!versionInfo) {
      return res.status(404).json({ error: 'Version not found' });
    }

    res.json({
      status: versionInfo.status,
      features: versionInfo.features,
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get version status',
    });
  }
});

// Get version info
router.get('/:version', async (req, res) => {
  try {
    const { version } = req.params;

    const versionInfo = await db.query.versions.findFirst({
      where: eq(versions.version, version),
    });

    if (!versionInfo) {
      return res.status(404).json({ error: 'Version not found' });
    }

    res.json(versionInfo);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get version info',
    });
  }
});

export default router;

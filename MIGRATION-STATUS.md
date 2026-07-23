# Composer 3 migration status

**Decision: RELEASE BLOCKED**

Imported:
- notation and document core;
- desktop publishing and file services;
- Electron main/preload services;
- tests, assets, installer metadata and locked package metadata.

Excluded:
- the complete legacy `src/ui/` directory;
- old bootstrap and release bootstrap;
- old workflows and generated release outputs.

The application is intentionally non-runnable until the clean renderer interface is installed and verified.

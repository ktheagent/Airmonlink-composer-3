# Checkpoint 3B — Build 18 clean renderer source installed

Date: 2026-07-23  
Repository: `ktheagent/Airmonlink-composer-3`  
Branch: `main`  
Version: `1.1.0`  
Build: `18`  
Decision: **RELEASE BLOCKED**

## Direct source installed

- `src/bootstrap.js`
- `src/ui/index.html`
- `src/ui/styles.css`
- `src/ui/app.js`
- `src/ui/dock-manager.js`
- `src/ui/publishing-controller.js`
- `test/v126-clean-renderer-migration.test.js`

The renderer is now normal repository source. It is no longer dependent on a reconstructed migration archive or a workflow-generated source commit.

## Confirmed in source

- eight top-level menu groups: File, Edit, View, Score, Play, Tools, Export, Help;
- Build 18 identity;
- dedicated PDF, PNG Pages, and System Print controls;
- structural grid layout with a scrollable score viewport;
- staff and Tonic Sol-fa views;
- composition, inspector, and Tonic Sol-fa dock panels;
- pointer-based float, drag, drop, redock, persistence, and off-screen recovery logic;
- direct renderer publishing module;
- legacy publishing injectors remain absent.

## Validation boundary

Source-level JavaScript syntax and migration tests were prepared and checked locally before upload. The repository read-only validation workflow is the authoritative CI confirmation and must pass for the exact branch commit.

Not yet confirmed:

- complete GitHub Actions validation conclusion;
- Windows compilation;
- installer or portable artifacts;
- installed application identity;
- visual staff-obstruction testing at required window sizes;
- physical mouse docking acceptance;
- PDF and PNG page inspection;
- startup and interaction performance measurements;
- printer, MIDI, or audio hardware testing.

No download is approved by this checkpoint.

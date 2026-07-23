#!/usr/bin/env bash
set -euo pipefail
cd current

rm -rf assets installer src test docs/release-audit
rm -f .gitignore LICENSE.txt package.json package-lock.json build_windows.ps1 setup_windows.ps1 start_preview.bat

cp -a ../legacy/assets .
cp -a ../legacy/installer .
cp -a ../legacy/scripts .
cp -a ../legacy/test .
cp ../legacy/.gitignore ../legacy/LICENSE.txt .
cp ../legacy/package.json ../legacy/package-lock.json .
cp ../legacy/build_windows.ps1 ../legacy/setup_windows.ps1 ../legacy/start_preview.bat .

mkdir -p src docs
cp -a ../legacy/src/core src/
cp -a ../legacy/src/desktop src/
cp ../legacy/src/main.js ../legacy/src/preload.js src/
cp -a ../legacy/docs/release-audit docs/

rm -rf src/ui
rm -f src/release-bootstrap.js
cat > src/bootstrap.js <<'EOF'
'use strict';
throw new Error(
  'Airmonlink Composer 3 interface migration is incomplete. Release is blocked.'
);
EOF

cat > MIGRATION-STATUS.md <<'EOF'
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
EOF

find docs/release-audit -type f -name '*.md' -print0 | xargs -0 sed -i 's/Airmonlink-composer-2/Airmonlink-composer-3/g'

test -d src/core
test -d src/desktop
test -d test
test ! -e src/ui
test ! -e src/release-bootstrap.js
node --check src/main.js
node --check src/preload.js
node --check src/bootstrap.js

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add -A
git commit -m "Import proven engine without legacy interface [skip ci]"
git push origin HEAD:main

#!/usr/bin/env bash
set -euo pipefail

expected_hash="c083093ec8b7bc28bb36a77bd14926104ad71232d09370968e385f3e3bfc5b2a"
bundle_b64="/tmp/composer3-ui.b64"
bundle_tgz="/tmp/composer3-ui.tar.gz"

cat migration/ui-bundle/part-*.txt > "$bundle_b64"
base64 --decode "$bundle_b64" > "$bundle_tgz"

actual_hash="$(sha256sum "$bundle_tgz" | awk '{print $1}')"
test "$actual_hash" = "$expected_hash"

expected_files="$(printf '%s\n' \
  'src/bootstrap.js' \
  'src/ui/app.js' \
  'src/ui/dock-manager.js' \
  'src/ui/index.html' \
  'src/ui/publishing-controller.js' \
  'src/ui/styles.css' | sort)"
actual_files="$(tar -tzf "$bundle_tgz" | sort)"
test "$actual_files" = "$expected_files"

tar -xzf "$bundle_tgz"

node --check src/bootstrap.js
node --check src/ui/app.js
node --check src/ui/dock-manager.js
node --check src/ui/publishing-controller.js
node --test test/v126-clean-renderer-migration.test.js

test ! -e src/ui/publishing-ui.js
test ! -e src/ui/publishing-exposure.js
test ! -e src/release-bootstrap.js
! grep -R -n -E 'Print or PDF|Print / PDF|PDF Print / PDF|Build 12' src/ui
grep -q 'Dedicated PDF' src/ui/index.html
grep -q 'PNG Pages' src/ui/index.html
grep -q 'System Print' src/ui/index.html

mkdir -p docs/checkpoints
cat > docs/checkpoints/03B-clean-renderer-installed.md <<'EOF'
# Checkpoint 3B — Clean renderer source installed

Repository: `ktheagent/Airmonlink-composer-3`
Branch: `main`
Decision: **RELEASE BLOCKED**

The repository-verified renderer bundle was reconstructed with SHA-256
`c083093ec8b7bc28bb36a77bd14926104ad71232d09370968e385f3e3bfc5b2a`
and installed as new source.

Confirmed source:
- `src/ui/index.html`
- `src/ui/styles.css`
- `src/ui/app.js`
- `src/ui/dock-manager.js`
- `src/ui/publishing-controller.js`
- clean `src/bootstrap.js`

Validation performed:
- exact archive-file allowlist;
- JavaScript syntax checks;
- dedicated clean-renderer migration tests;
- obsolete injector files absent;
- old publishing labels and Build 12 marker absent;
- Dedicated PDF, PNG Pages, and System Print controls present.

Not yet verified:
- complete regression suite;
- compiled Windows runtime;
- visual staff-obstruction behavior at required window sizes;
- real mouse docking acceptance;
- independent PDF and PNG output inspection;
- performance measurements;
- installer identity and human acceptance;
- physical printer, MIDI, or audio hardware.

No download is approved by this checkpoint.
EOF

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add src/bootstrap.js src/ui test/v126-clean-renderer-migration.test.js \
  docs/checkpoints/03B-clean-renderer-installed.md

if git diff --cached --quiet; then
  echo "Clean renderer already installed; no commit required."
  exit 0
fi

git commit -m "Install verified clean renderer checkpoint [skip ci]"
git push origin HEAD:main

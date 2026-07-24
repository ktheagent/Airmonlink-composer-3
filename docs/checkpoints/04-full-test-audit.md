# Checkpoint 04 — Complete Composer 3 source audit

Repository: `ktheagent/Airmonlink-composer-3`
Branch: `main`
Commit: `64cb7402ae57b3ebc4d056220a03f8428b635f62`
Node: `v20.20.2`
npm: `10.8.2`

This report was generated from the exact checked-out commit.

## Required files

- PASS `src/bootstrap.js`
- PASS `src/main.js`
- PASS `src/preload.js`
- PASS `src/ui/index.html`
- PASS `src/ui/styles.css`
- PASS `src/ui/app.js`
- PASS `src/ui/dock-manager.js`
- PASS `src/ui/publishing-controller.js`
- PASS `package.json`
- PASS `package-lock.json`

## Forbidden legacy files

- PASS absent `src/ui/publishing-ui.js`
- PASS absent `src/ui/publishing-exposure.js`
- PASS absent `src/release-bootstrap.js`

## JavaScript syntax

- PASS `src/bootstrap.js`
- PASS `src/main.js`
- PASS `src/preload.js`
- PASS `src/ui/app.js`
- PASS `src/ui/dock-manager.js`
- PASS `src/ui/publishing-controller.js`

## Lint

- FAIL `npm run lint`
```text

> airmonlink-composer@1.1.0 lint
> node scripts/lint.js

Syntax error in src/startup-guard.js
/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/src/startup-guard.js:141



SyntaxError: Unexpected end of input
    at wrapSafe (node:internal/modules/cjs/loader:1464:18)
    at checkSyntax (node:internal/main/check_syntax:78:3)

Node.js v20.20.2

Syntax error in src/ui/composer3-shell.js
/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/src/ui/composer3-shell.js:52
          Object.freeze({ label: 'Inspector', icon: '❉#, selector: '[data-command="toggleInspector"]' }),
                                                                     ^^^^^^^^^^^^

SyntaxError: Invalid left-hand side in assignment
    at wrapSafe (node:internal/modules/cjs/loader:1464:18)
    at checkSyntax (node:internal/main/check_syntax:78:3)

Node.js v20.20.2

```

## Test files

- PASS `test/enhanced-notation.test.js`
- PASS `test/formats-history.test.js`
- PASS `test/music-theory.test.js`
- PASS `test/professionalization.test.js`
- PASS `test/score-model.test.js`
- PASS `test/solfa-harmony.test.js`
- PASS `test/structural-score.test.js`
- PASS `test/v04-acceptance.test.js`
- PASS `test/v05-document-editing.test.js`
- PASS `test/v06-tonic-four-layer.test.js`
- PASS `test/v07-integrated-instructions.test.js`
- PASS `test/v08-video-workflow.test.js`
- PASS `test/v09-tonic-solfa-accuracy.test.js`
- PASS `test/v091-performance.test.js`
- PASS `test/v092-shutdown-lifecycle.test.js`
- PASS `test/v100-phase2-foundations.test.js`
- PASS `test/v100-workspace-phase2.test.js`
- PASS `test/v110-publication-entry.test.js`
- PASS `test/v120-build14-command-groups.test.js`
- PASS `test/v120-build14-entry-workflows.test.js`
- PASS `test/v120-build14-publication-text.test.js`
- PASS `test/v120-build14-solfa-layout.test.js`
- PASS `test/v120-build14-windows-association.test.js`
- PASS `test/v120-build14-workspace-migration.test.js`
- PASS `test/v121-legacy-lyrics-repair.test.js`
- FAIL `test/v122-dedicated-publishing.test.js`
```text
TAP version 13
# Subtest: publishing request sanitizes filenames and preserves physical dimensions
ok 1 - publishing request sanitizes filenames and preserves physical dimensions
  ---
  duration_ms: 1.568741
  ...
# Subtest: dedicated PDF options preserve backgrounds, page size and zero margins
ok 2 - dedicated PDF options preserve backgrounds, page size and zero margins
  ---
  duration_ms: 0.798277
  ...
# Subtest: numbered PNG paths are unique and stable
ok 3 - numbered PNG paths are unique and stable
  ---
  duration_ms: 0.614553
  ...
# Subtest: private publishing URL accepts only strict PDF and PNG commands
ok 4 - private publishing URL accepts only strict PDF and PNG commands
  ---
  duration_ms: 0.66649
  ...
# Subtest: PDF and PNG signatures are validated before success
ok 5 - PDF and PNG signatures are validated before success
  ---
  duration_ms: 0.947095
  ...
# Subtest: atomic single-file write leaves no temporary file
ok 6 - atomic single-file write leaves no temporary file
  ---
  duration_ms: 11.480024
  ...
# Subtest: atomic PNG batch restores old files when installation fails
ok 7 - atomic PNG batch restores old files when installation fails
  ---
  duration_ms: 4.349014
  ...
# Subtest: desktop backend and direct renderer expose dedicated PDF and numbered PNG publishing
ok 8 - desktop backend and direct renderer expose dedicated PDF and numbered PNG publishing
  ---
  duration_ms: 0.766126
  ...
# Subtest: Build 18 package metadata names both Windows artifacts consistently
not ok 9 - Build 18 package metadata names both Windows artifacts consistently
  ---
  duration_ms: 2.113323
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v122-dedicated-publishing.test.js:146:1'
  failureType: 'testCodeFailure'
  error: |-
    Expected values to be strictly equal:
    + actual - expected
    
    + 'src/startup-guard.js'
    - 'src/bootstrap.js'
           ^
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: 'src/bootstrap.js'
  actual: 'src/startup-guard.js'
  operator: 'strictEqual'
  stack: |-
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v122-dedicated-publishing.test.js:148:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
1..9
# tests 9
# suites 0
# pass 8
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 79.86077
```
- PASS `test/v123-build16-publishing-exposure.test.js`
- FAIL `test/v124-build16-release-validator.test.js`
```text
TAP version 13
# Subtest: Build 19 release validator requires the new source and runtime shell proof
not ok 1 - Build 19 release validator requires the new source and runtime shell proof
  ---
  duration_ms: 5.519629
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v124-build16-release-validator.test.js:11:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /startup-guard\.js/. Input:
    
    'param(\n' +
      '  [string]$ReleaseDirectory = "release",\n' +
      '  [string]$ValidationDirectory = "validation",\n' +
      '  [int]$ExpectedBuild = 19\n' +
      ')\n' +
      '\n' +
      '$ErrorActionPreference = "Stop"\n' +
      'Set-StrictMode -Version Latest\n' +
      '\n' +
      '$root = (Resolve-Path ".").Path\n' +
      '$release = Join-Path $root $ReleaseDirectory\n' +
      '$validation = Join-Path $root $ValidationDirectory\n' +
      'New-Item -ItemType Directory -Force $validation | Out-Null\n' +
      '\n' +
      '$rows = [System.Collections.Generic.List[object]]::new()\n' +
      '\n' +
      'function Add-Row {\n' +
      '  param(\n' +
      '    [string]$Name,\n' +
      '    [ValidateSet("PASS", "FAIL", "BLOCKED", "NOT TESTED")]\n' +
      '    [string]$Status,\n' +
      '    [string]$Details\n' +
      '  )\n' +
      '  $rows.Add([pscustomobject]@{\n' +
      '    Name = $Name\n' +
      '    Status = $Status\n' +
      '    Details = $Details\n' +
      '  })\n' +
      '}\n' +
      '\n' +
      'function Assert-Check {\n' +
      '  param([bool]$Condition, [string]$Name, [string]$Details)\n' +
      '  if ($Condition) {\n' +
      '    Add-Row $Name "PASS" $Details\n' +
      '  } else {\n' +
      '    Add-Row $Name "FAIL" $Details\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      'function Test-PEFile {\n' +
      '  param([string]$Path)\n' +
      '  if (-not (Test-Path $Path)) { return $false }\n' +
      '\n' +
      '  $stream = [System.IO.File]::OpenRead($Path)\n' +
      '  try {\n' +
      '    if ($stream.Length -lt 1024) { return $false }\n' +
      '    $reader = [System.IO.BinaryReader]::new($stream)\n' +
      '    if ($reader.ReadUInt16() -ne 0x5A4D) { return $false }\n' +
      '    $stream.Position = 0x3C\n' +
      '    $peOffset = $reader.ReadInt32()\n' +
      '    if ($peOffset -lt 64 -or $peOffset -gt ($stream.Length - 4)) {\n' +
      '      return $false\n' +
      '    }\n' +
      '    $stream.Position = $peOffset\n' +
      '    return $reader.ReadUInt32() -eq 0x00004550\n' +
      '  } finally {\n' +
      '    $stream.Dispose()\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      '$packagePath = Join-Path $root "package.json"\n' +
      '$package = Get-Content $packagePath -Raw | ConvertFrom-Json\n' +
      '$version = [string]$package.version\n' +
      '$buildNumber = [string]$package.buildNumber\n' +
      '$buildVersion = [string]$package.build.buildVersion\n' +
      '$expectedSetup = "Airmonlink-Composer-$version-Build$ExpectedBuild-Setup.exe"\n' +
      '$expectedPortable = "Airmonlink-Composer-$version-Build$ExpectedBuild-Portable.exe"\n' +
      '$setupPath = Join-Path $release $expectedSetup\n' +
      '$portablePath = Join-Path $release $expectedPortable\n' +
      '\n' +
      'Assert-Check ($buildNumber -eq [string]$ExpectedBuild) `\n' +
      '  "Package build number" `\n' +
      '  "Expected $ExpectedBuild; found $buildNumber"\n' +
      '\n' +
      'Assert-Check ($buildVersion -eq "$version.$ExpectedBuild") `\n' +
      '  "Package build version" `\n' +
      '  "Expected $version.$ExpectedBuild; found $buildVersion"\n' +
      '\n' +
      'Assert-Check ([string]$package.main -eq "src/bootstrap.js") `\n' +
      '  "Package entry point" `\n' +
      '  "Entry point is $($package.main)"\n' +
      '\n' +
      'Assert-Check ([string]$package.build.nsis.artifactName -match "Build$ExpectedBuild") `\n' +
      '  "Installer naming" `\n' +
      '  ([string]$package.build.nsis.artifactName)\n' +
      '\n' +
      'Assert-Check ([string]$package.build.portable.artifactName -match "Build$ExpectedBuild") `\n' +
      '  "Portable naming" `\n' +
      '  ([string]$package.build.portable.artifactName)\n' +
      '\n' +
      '$requiredSource = @(\n' +
      '  "src\\bootstrap.js",\n' +
      '  "src\\main.js",\n' +
      '  "src\\preload.js",\n' +
      '  "src\\desktop\\publishing.js",\n' +
      '  "src\\ui\\index.html",\n' +
      '  "src\\ui\\styles.css",\n' +
      '  "src\\ui\\app.js",\n' +
      '  "src\\ui\\composer3-shell.js",\n' +
      '  "src\\ui\\composer3-shell.css",\n' +
      '  "src\\ui\\dock-manager.js",\n' +
      '  "src\\ui\\publishing-controller.js",\n' +
      '  "test\\v127-composer3-shell.test.js"\n' +
      ')\n' +
      '\n' +
      'foreach ($relative in $requiredSource) {\n' +
      '  Assert-Check (Test-Path (Join-Path $root $relative)) `\n' +
      '    "Required source: $relative" `\n' +
      '    $relative\n' +
      '}\n' +
      '\n' +
      '$bootstrapSource = Get-Content (Join-Path $root "src\\bootstrap.js") -Raw\n' +
      '$shellSource = Get-Content (Join-Path $root "src\\ui\\composer3-shell.js") -Raw\n' +
      '$shellCss = Get-Content (Join-Path $root "src\\ui\\composer3-shell.css") -Raw\n' +
      '\n' +
      'Assert-Check $bootstrapSource.Contains("const BUILD = $ExpectedBuild;") `\n' +
      '  "Bootstrap build identity" `\n' +
      '  "src/bootstrap.js declares Build $ExpectedBuild"\n' +
      '\n' +
      'Assert-Check $bootstrapSource.Contains("installComposer3Shell") `\n' +
      '  "Composer 3 bootstrap activation" `\n' +
      '  "The packaged entry point installs the Composer 3 shell"\n' +
      '\n' +
      'Assert-Check $bootstrapSource.Contains("window.hide()") `\n' +
      '  "No legacy interface flash" `\n' +
      '  "The main window remains hidden until Composer 3 verification passes"\n' +
      '\n' +
      'Assert-Check $bootstrapSource.Contains("composer3-shell-ready") `\n' +
      '  "Composer 3 runtime evidence" `\n' +
      '  "The bootstrap records a Composer 3 readiness event"\n' +
      '\n' +
      'Assert-Check $bootstrapSource.Contains("window.AirmonPublishingUI") `\n' +
      '  "Publishing API verification" `\n' +
      '  "The bootstrap verifies the live publishing controller"\n' +
      '\n' +
      'Assert-Check $bootstrapSource.Contains("window.AirmonDockManager") `\n' +
      '  "Docking API verification" `\n' +
      '  "The bootstrap verifies the live docking manager"\n' +
      '\n' +
      'Assert-Check $shellSource.Contains("const BUILD = $ExpectedBuild;") `\n' +
      '  "Composer 3 shell build identity" `\n' +
      '  "composer3-shell.js declares Build $ExpectedBuild"\n' +
      '\n' +
      'Assert-Check $shellSource.Contains("Dedicated PDF") `\n' +
      '  "Dedicated PDF command" `\n' +
      '  "Composer 3 exposes Dedicated PDF"\n' +
      '\n' +
      'Assert-Check $shellSource.Contains("PNG pages") `\n' +
      '  "PNG pages command" `\n' +
      '  "Composer 3 exposes numbered PNG pages"\n' +
      '\n' +
      'Assert-Check $shellSource.Contains("System Print") `\n' +
      '  "System Print fallback" `\n' +
      '  "Composer 3 exposes System Print separately"\n' +
      '\n' +
      'Assert-Check $shellSource.Contains("retireLegacyNavigation") `\n' +
      '  "Legacy navigation retirement" `\n' +
      '  "The old command surface is retired after the new shell mounts"\n' +
      '\n' +
      'Assert-Check $shellCss.Contains("grid-template-rows: auto auto auto minmax(0, 1fr) auto") `\n' +
      '  "Staff-safe shell layout" `\n' +
      '  "The command deck and score workspace occupy separate grid rows"\n' +
      '\n' +
      'Assert-Check (-not ($shellSource.Contains("Build 18"))) `\n' +
      '  "No stale shell build label" `\n' +
      '  "Composer 3 shell source contains no Build 18 label"\n' +
      '\n' +
      'Assert-Check (Test-Path $setupPath) `\n' +
      '  "Setup artifact exists" `\n' +
      '  $setupPath\n' +
      '\n' +
      'Assert-Check (Test-Path $portablePath) `\n' +
      '  "Portable artifact exists" `\n' +
      '  $portablePath\n' +
      '\n' +
      'Assert-Check (Test-PEFile $setupPath) `\n' +
      '  "Setup PE validation" `\n' +
      '  "MZ and PE signatures"\n' +
      '\n' +
      'Assert-Check (Test-PEFile $portablePath) `\n' +
      '  "Portable PE validation" `\n' +
      '  "MZ and PE signatures"\n' +
      '\n' +
      'if (Test-Path $setupPath) {\n' +
      '  $setupInfo = Get-Item $setupPath\n' +
      '  Assert-Check ($setupInfo.Length -gt 10MB) `\n' +
      '    "Setup size sanity" `\n' +
      '    "$($setupInfo.Length) bytes"\n' +
      '}\n' +
      '\n' +
      'if (Test-Path $portablePath) {\n' +
      '  $portableInfo = Get-Item $portablePath\n' +
      '  Assert-Check ($portableInfo.Length -gt 10MB) `\n' +
      '    "Portable size sanity" `\n' +
      '    "$($portableInfo.Length) bytes"\n' +
      '}\n' +
      '\n' +
      '$hashLines = @()\n' +
      'foreach ($file in @($setupPath, $portablePath)) {\n' +
      '  if (Test-Path $file) {\n' +
      '    $hash = Get-FileHash $file -Algorithm SHA256\n' +
      '    $hashLines += "$($hash.Hash.ToLowerInvariant()) $([IO.Path]::GetFileName($file))"\n' +
      '  }\n' +
      '}\n' +
      '$hashPath = Join-Path $release "SHA256SUMS.txt"\n' +
      '$hashLines | Set-Content -Encoding ascii $hashPath\n' +
      'Assert-Check ((Test-Path $hashPath) -and ((Get-Item $hashPath).Length -gt 100)) `\n' +
      '  "SHA256 manifest" `\n' +
      '  $hashPath\n' +
      '\n' +
      '$rendererLog = Join-Path $validation "portable-renderer-validation.jsonl"\n' +
      'Remove-Item $rendererLog -Force -ErrorAction SilentlyContinue\n' +
      '\n' +
      'if (Test-Path $portablePath) {\n' +
      '  $previousLog = $env:AIRMONLINK_VALIDATION_LOG\n' +
      '  $process = $null\n' +
      '  try {\n' +
      '    $env:AIRMONLINK_VALIDATION_LOG = $rendererLog\n' +
      '    $process = Start-Process -FilePath $portablePath -PassThru\n' +
      '  } finally {\n' +
      '    if ($null -eq $previousLog) {\n' +
      '      Remove-Item Env:AIRMONLINK_VALIDATION_LOG -ErrorAction SilentlyContinue\n' +
      '    } else {\n' +
      '      $env:AIRMONLINK_VALIDATION_LOG = $previousLog\n' +
      '    }\n' +
      '  }\n' +
      '\n' +
      '  Start-Sleep -Seconds 12\n' +
      '  $alive = -not $process.HasExited\n' +
      '  Assert-Check $alive `\n' +
      '    "Portable launch smoke test" `\n' +
      '    "Process started and remained alive for 12 seconds"\n' +
      '\n' +
      '  $records = @()\n' +
      '  if (Test-Path $rendererLog) {\n' +
      '    foreach ($line in Get-Content $rendererLog) {\n' +
      '      try {\n' +
      '        $records += ($line | ConvertFrom-Json)\n' +
      '      } catch {\n' +
      '      }\n' +
      '    }\n' +
      '  }\n' +
      '\n' +
      '  $ready = $records |\n' +
      '    Where-Object { $_.stage -eq "composer3-shell-ready" } |\n' +
      '    Select-Object -Last 1\n' +
      '\n' +
      '  Assert-Check ($null -ne $ready) `\n' +
      '    "Built Composer 3 runtime proof" `\n' +
      '    "Portable executable reported composer3-shell-ready"\n' +
      '\n' +
      '  if ($null -ne $ready) {\n' +
      '    $shellReady = $ready.shell\n' +
      '    $publishingReady = $ready.publishing\n' +
      '    $dockingReady = $ready.docking\n' +
      '\n' +
      '    Assert-Check ([int]$ready.build -eq $ExpectedBuild) `\n' +
      '      "Runtime build identity" `\n' +
      '      "Runtime reported Build $($ready.build)"\n' +
      '\n' +
      '    Assert-Check (\n' +
      '      ($null -ne $shellReady) -and\n' +
      '      [bool]$shellReady.mounted -and\n' +
      '      [int]$shellReady.build -eq $ExpectedBuild -and\n' +
      '      [int]$shellReady.tabs -eq 6 -and\n' +
      '      [int]$shellReady.activePanels -eq 1\n' +
      '    ) `\n' +
      '      "Composer 3 shell runtime structure" `\n' +
      '      "Mounted=$($shellReady.mounted); tabs=$($shellReady.tabs); active panels=$($shellReady.activePanels)"\n' +
      '\n' +
      '    Assert-Check (\n' +
      '      ($null -ne $shellReady) -and\n' +
      '      [int]$shellReady.publishControls -ge 7\n' +
      '    ) `\n' +
      '      "Composer 3 publishing controls" `\n' +
      '      "Runtime reported $($shellReady.publishControls) publishing controls"\n' +
      '\n' +
      '    Assert-Check (\n' +
      '      ($null -ne $shellReady) -and\n' +
      '      [bool]$shellReady.legacyNavigationInert\n' +
      '    ) `\n' +
      '      "Legacy interface retired at runtime" `\n' +
      '      "Old command navigation is hidden, inert and removed from keyboard navigation"\n' +
      '\n' +
      '    Assert-Check (\n' +
      '      ($null -ne $shellReady) -and\n' +
      '      (-not [bool]$shellReady.staffViewportOverlapped)\n' +
      '    ) `\n' +
      '      "No command deck overlap with staff viewport" `\n' +
      '      "Runtime geometry reported no overlap"\n' +
      '\n' +
      '    Assert-Check (\n' +
      '      ($null -ne $publishingReady) -and\n' +
      '      [int]$publishingReady.build -eq $ExpectedBuild -and\n' +
      '      [bool]$publishingReady.api -and\n' +
      '      [bool]$publishingReady.native -and\n' +
      '      [int]$publishingReady.pdfControls -ge 2 -and\n' +
      '      [int]$publishingReady.pngControls -ge 2\n' +
      '    ) `\n' +
      '      "Publishing runtime wiring" `\n' +
      '      "PDF=$($publishingReady.pdfControls); PNG=$($publishingReady.pngControls)"\n' +
      '\n' +
      '    Assert-Check (\n' +
      '      ($null -ne $dockingReady) -and\n' +
      '      [int]$dockingReady.handles -ge 3 -and\n' +
      '      [bool]$dockingReady.dropZone -and\n' +
      '      [int]$dockingReady.panels -ge 3\n' +
      '    ) `\n' +
      '      "Docking runtime wiring" `\n' +
      '      "Handles=$($dockingReady.handles); panels=$($dockingReady.panels)"\n' +
      '  }\n' +
      '\n' +
      '  if ($alive) {\n' +
      '    $process.CloseMainWindow() | Out-Null\n' +
      '    Start-Sleep -Seconds 3\n' +
      '    if (-not $process.HasExited) {\n' +
      '      Stop-Process -Id $process.Id -Force\n' +
      '    }\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      'Add-Row "Human Windows GUI'... 1687 more characters
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: |-
    param(
      [string]$ReleaseDirectory = "release",
      [string]$ValidationDirectory = "validation",
      [int]$ExpectedBuild = 19
    )
    
    $ErrorActionPreference = "Stop"
    Set-StrictMode -Version Latest
    
    $root = (Resolve-Path ".").Path
    $release = Join-Path $root $ReleaseDirectory
    $validation = Join-Path $root $ValidationDirectory
    New-Item -ItemType Directory -Force $validation | Out-Null
    
    $rows = [System.Collections.Generic.List[object]]::new()
    
    function Add-Row {
      param(
        [string]$Name,
        [ValidateSet("PASS", "FAIL", "BLOCKED", "NOT TESTED")]
        [string]$Status,
        [string]$Details
      )
      $rows.Add([pscustomobject]@{
        Name = $Name
        Status = $Status
        Details = $Details
      })
    }
    
    function Assert-Check {
      param([bool]$Condition, [string]$Name, [string]$Details)
      if ($Condition) {
        Add-Row $Name "PASS" $Details
      } else {
        Add-Row $Name "FAIL" $Details
      }
    }
    
    function Test-PEFile {
      param([string]$Path)
      if (-not (Test-Path $Path)) { return $false }
    
      $stream = [System.IO.File]::OpenRead($Path)
      try {
        if ($stream.Length -lt 1024) { return $false }
        $reader = [System.IO.BinaryReader]::new($stream)
        if ($reader.ReadUInt16() -ne 0x5A4D) { return $false }
        $stream.Position = 0x3C
        $peOffset = $reader.ReadInt32()
        if ($peOffset -lt 64 -or $peOffset -gt ($stream.Length - 4)) {
          return $false
        }
        $stream.Position = $peOffset
        return $reader.ReadUInt32() -eq 0x00004550
      } finally {
        $stream.Dispose()
      }
    }
    
    $packagePath = Join-Path $root "package.json"
    $package = Get-Content $packagePath -Raw | ConvertFrom-Json
    $version = [string]$package.version
    $buildNumber = [string]$package.buildNumber
    $buildVersion = [string]$package.build.buildVersion
    $expectedSetup = "Airmonlink-Composer-$version-Build$ExpectedBuild-Setup.exe"
    $expectedPortable = "Airmonlink-Composer-$version-Build$ExpectedBuild-Portable.exe"
    $setupPath = Join-Path $release $expectedSetup
    $portablePath = Join-Path $release $expectedPortable
    
    Assert-Check ($buildNumber -eq [string]$ExpectedBuild) `
      "Package build number" `
      "Expected $ExpectedBuild; found $buildNumber"
    
    Assert-Check ($buildVersion -eq "$version.$ExpectedBuild") `
      "Package build version" `
      "Expected $version.$ExpectedBuild; found $buildVersion"
    
    Assert-Check ([string]$package.main -eq "src/bootstrap.js") `
      "Package entry point" `
      "Entry point is $($package.main)"
    
    Assert-Check ([string]$package.build.nsis.artifactName -match "Build$ExpectedBuild") `
      "Installer naming" `
      ([string]$package.build.nsis.artifactName)
    
    Assert-Check ([string]$package.build.portable.artifactName -match "Build$ExpectedBuild") `
      "Portable naming" `
      ([string]$package.build.portable.artifactName)
    
    $requiredSource = @(
      "src\bootstrap.js",
      "src\main.js",
      "src\preload.js",
      "src\desktop\publishing.js",
      "src\ui\index.html",
      "src\ui\styles.css",
      "src\ui\app.js",
      "src\ui\composer3-shell.js",
      "src\ui\composer3-shell.css",
      "src\ui\dock-manager.js",
      "src\ui\publishing-controller.js",
      "test\v127-composer3-shell.test.js"
    )
    
    foreach ($relative in $requiredSource) {
      Assert-Check (Test-Path (Join-Path $root $relative)) `
        "Required source: $relative" `
        $relative
    }
    
    $bootstrapSource = Get-Content (Join-Path $root "src\bootstrap.js") -Raw
    $shellSource = Get-Content (Join-Path $root "src\ui\composer3-shell.js") -Raw
    $shellCss = Get-Content (Join-Path $root "src\ui\composer3-shell.css") -Raw
    
    Assert-Check $bootstrapSource.Contains("const BUILD = $ExpectedBuild;") `
      "Bootstrap build identity" `
      "src/bootstrap.js declares Build $ExpectedBuild"
    
    Assert-Check $bootstrapSource.Contains("installComposer3Shell") `
      "Composer 3 bootstrap activation" `
      "The packaged entry point installs the Composer 3 shell"
    
    Assert-Check $bootstrapSource.Contains("window.hide()") `
      "No legacy interface flash" `
      "The main window remains hidden until Composer 3 verification passes"
    
    Assert-Check $bootstrapSource.Contains("composer3-shell-ready") `
      "Composer 3 runtime evidence" `
      "The bootstrap records a Composer 3 readiness event"
    
    Assert-Check $bootstrapSource.Contains("window.AirmonPublishingUI") `
      "Publishing API verification" `
      "The bootstrap verifies the live publishing controller"
    
    Assert-Check $bootstrapSource.Contains("window.AirmonDockManager") `
      "Docking API verification" `
      "The bootstrap verifies the live docking manager"
    
    Assert-Check $shellSource.Contains("const BUILD = $ExpectedBuild;") `
      "Composer 3 shell build identity" `
      "composer3-shell.js declares Build $ExpectedBuild"
    
    Assert-Check $shellSource.Contains("Dedicated PDF") `
      "Dedicated PDF command" `
      "Composer 3 exposes Dedicated PDF"
    
    Assert-Check $shellSource.Contains("PNG pages") `
      "PNG pages command" `
      "Composer 3 exposes numbered PNG pages"
    
    Assert-Check $shellSource.Contains("System Print") `
      "System Print fallback" `
      "Composer 3 exposes System Print separately"
    
    Assert-Check $shellSource.Contains("retireLegacyNavigation") `
      "Legacy navigation retirement" `
      "The old command surface is retired after the new shell mounts"
    
    Assert-Check $shellCss.Contains("grid-template-rows: auto auto auto minmax(0, 1fr) auto") `
      "Staff-safe shell layout" `
      "The command deck and score workspace occupy separate grid rows"
    
    Assert-Check (-not ($shellSource.Contains("Build 18"))) `
      "No stale shell build label" `
      "Composer 3 shell source contains no Build 18 label"
    
    Assert-Check (Test-Path $setupPath) `
      "Setup artifact exists" `
      $setupPath
    
    Assert-Check (Test-Path $portablePath) `
      "Portable artifact exists" `
      $portablePath
    
    Assert-Check (Test-PEFile $setupPath) `
      "Setup PE validation" `
      "MZ and PE signatures"
    
    Assert-Check (Test-PEFile $portablePath) `
      "Portable PE validation" `
      "MZ and PE signatures"
    
    if (Test-Path $setupPath) {
      $setupInfo = Get-Item $setupPath
      Assert-Check ($setupInfo.Length -gt 10MB) `
        "Setup size sanity" `
        "$($setupInfo.Length) bytes"
    }
    
    if (Test-Path $portablePath) {
      $portableInfo = Get-Item $portablePath
      Assert-Check ($portableInfo.Length -gt 10MB) `
        "Portable size sanity" `
        "$($portableInfo.Length) bytes"
    }
    
    $hashLines = @()
    foreach ($file in @($setupPath, $portablePath)) {
      if (Test-Path $file) {
        $hash = Get-FileHash $file -Algorithm SHA256
        $hashLines += "$($hash.Hash.ToLowerInvariant()) $([IO.Path]::GetFileName($file))"
      }
    }
    $hashPath = Join-Path $release "SHA256SUMS.txt"
    $hashLines | Set-Content -Encoding ascii $hashPath
    Assert-Check ((Test-Path $hashPath) -and ((Get-Item $hashPath).Length -gt 100)) `
      "SHA256 manifest" `
      $hashPath
    
    $rendererLog = Join-Path $validation "portable-renderer-validation.jsonl"
    Remove-Item $rendererLog -Force -ErrorAction SilentlyContinue
    
    if (Test-Path $portablePath) {
      $previousLog = $env:AIRMONLINK_VALIDATION_LOG
      $process = $null
      try {
        $env:AIRMONLINK_VALIDATION_LOG = $rendererLog
        $process = Start-Process -FilePath $portablePath -PassThru
      } finally {
        if ($null -eq $previousLog) {
          Remove-Item Env:AIRMONLINK_VALIDATION_LOG -ErrorAction SilentlyContinue
        } else {
          $env:AIRMONLINK_VALIDATION_LOG = $previousLog
        }
      }
    
      Start-Sleep -Seconds 12
      $alive = -not $process.HasExited
      Assert-Check $alive `
        "Portable launch smoke test" `
        "Process started and remained alive for 12 seconds"
    
      $records = @()
      if (Test-Path $rendererLog) {
        foreach ($line in Get-Content $rendererLog) {
          try {
            $records += ($line | ConvertFrom-Json)
          } catch {
          }
        }
      }
    
      $ready = $records |
        Where-Object { $_.stage -eq "composer3-shell-ready" } |
        Select-Object -Last 1
    
      Assert-Check ($null -ne $ready) `
        "Built Composer 3 runtime proof" `
        "Portable executable reported composer3-shell-ready"
    
      if ($null -ne $ready) {
        $shellReady = $ready.shell
        $publishingReady = $ready.publishing
        $dockingReady = $ready.docking
    
        Assert-Check ([int]$ready.build -eq $ExpectedBuild) `
          "Runtime build identity" `
          "Runtime reported Build $($ready.build)"
    
        Assert-Check (
          ($null -ne $shellReady) -and
          [bool]$shellReady.mounted -and
          [int]$shellReady.build -eq $ExpectedBuild -and
          [int]$shellReady.tabs -eq 6 -and
          [int]$shellReady.activePanels -eq 1
        ) `
          "Composer 3 shell runtime structure" `
          "Mounted=$($shellReady.mounted); tabs=$($shellReady.tabs); active panels=$($shellReady.activePanels)"
    
        Assert-Check (
          ($null -ne $shellReady) -and
          [int]$shellReady.publishControls -ge 7
        ) `
          "Composer 3 publishing controls" `
          "Runtime reported $($shellReady.publishControls) publishing controls"
    
        Assert-Check (
          ($null -ne $shellReady) -and
          [bool]$shellReady.legacyNavigationInert
        ) `
          "Legacy interface retired at runtime" `
          "Old command navigation is hidden, inert and removed from keyboard navigation"
    
        Assert-Check (
          ($null -ne $shellReady) -and
          (-not [bool]$shellReady.staffViewportOverlapped)
        ) `
          "No command deck overlap with staff viewport" `
          "Runtime geometry reported no overlap"
    
        Assert-Check (
          ($null -ne $publishingReady) -and
          [int]$publishingReady.build -eq $ExpectedBuild -and
          [bool]$publishingReady.api -and
          [bool]$publishingReady.native -and
          [int]$publishingReady.pdfControls -ge 2 -and
          [int]$publishingReady.pngControls -ge 2
        ) `
          "Publishing runtime wiring" `
          "PDF=$($publishingReady.pdfControls); PNG=$($publishingReady.pngControls)"
    
        Assert-Check (
          ($null -ne $dockingReady) -and
          [int]$dockingReady.handles -ge 3 -and
          [bool]$dockingReady.dropZone -and
          [int]$dockingReady.panels -ge 3
        ) `
          "Docking runtime wiring" `
          "Handles=$($dockingReady.handles); panels=$($dockingReady.panels)"
      }
    
      if ($alive) {
        $process.CloseMainWindow() | Out-Null
        Start-Sleep -Seconds 3
        if (-not $process.HasExited) {
          Stop-Process -Id $process.Id -Force
        }
      }
    }
    
    Add-Row "Human Windows GUI inspection" "BLOCKED" `
      "Requires a person to compare the installed Build $ExpectedBuild interface with the approved requirement matrix."
    
    Add-Row "Installer upgrade path" "NOT TESTED" `
      "Requires installation over an earlier Windows release."
    
    Add-Row "PDF page opening and visual inspection" "BLOCKED" `
      "Requires exporting and opening every PDF page in an independent Windows viewer."
    
    Add-Row "PNG page visual inspection" "BLOCKED" `
      "Requires exporting and visually inspecting every numbered PNG page."
    
    Add-Row "Mouse drag-out and redock" "BLOCKED" `
      "Requires real mouse interaction in the built Windows application."
    
    Add-Row "MIDI hardware" "NOT TESTED" `
      "Requires physical MIDI hardware."
    
    Add-Row "Audio hardware" "NOT TESTED" `
      "Requires physical audio output."
    
    Add-Row "Code-signing trust" "BLOCKED" `
      "No signing certificate was supplied."
    
    $jsonPath = Join-Path $validation "windows-release-validation.json"
    $csvPath = Join-Path $validation "windows-release-validation.csv"
    $textPath = Join-Path $validation "windows-release-validation.txt"
    
    $rows | ConvertTo-Json -Depth 8 | Set-Content -Encoding utf8 $jsonPath
    $rows | Export-Csv -NoTypeInformation -Encoding utf8 $csvPath
    $rows | Format-Table -AutoSize | Out-String | Set-Content -Encoding utf8 $textPath
    
    $failures = @($rows | Where-Object Status -eq "FAIL")
    if ($failures.Count -gt 0) {
      $failures | Format-Table -AutoSize
      throw "Windows release validation found $($failures.Count) FAIL row(s)."
    }
    
    "OK" | Set-Content -Encoding ascii (Join-Path $validation "windows-validation.ok")
    Write-Host "Windows validation completed without FAIL rows. BLOCKED and NOT TESTED rows remain explicit."
    exit 0
    
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v124-build16-release-validator.test.js:34:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
    AsyncResource.runInAsyncScope (node:async_hooks:206:9)
    AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)
  ...
# Subtest: Build 19 validator leaves hands-on and hardware checks explicit
ok 2 - Build 19 validator leaves hands-on and hardware checks explicit
  ---
  duration_ms: 0.446096
  ...
1..2
# tests 2
# suites 0
# pass 1
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 60.976924
```
- FAIL `test/v125-build17-static-publishing.test.js`
```text
TAP version 13
# Subtest: Build 19 package uses the Composer 3 source and matching artifact names
not ok 1 - Build 19 package uses the Composer 3 source and matching artifact names
  ---
  duration_ms: 2.977212
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v125-build17-static-publishing.test.js:11:1'
  failureType: 'testCodeFailure'
  error: |-
    Expected values to be strictly equal:
    + actual - expected
    
    + 'src/startup-guard.js'
    - 'src/bootstrap.js'
           ^
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: 'src/bootstrap.js'
  actual: 'src/startup-guard.js'
  operator: 'strictEqual'
  stack: |-
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v125-build17-static-publishing.test.js:14:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
    AsyncResource.runInAsyncScope (node:async_hooks:206:9)
    AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)
  ...
# Subtest: Build 19 publishes through static controls without document observers
ok 2 - Build 19 publishes through static controls without document observers
  ---
  duration_ms: 0.825798
  ...
# Subtest: Build 19 bootstrap verifies the actual shell before showing the window
ok 3 - Build 19 bootstrap verifies the actual shell before showing the window
  ---
  duration_ms: 0.264706
  ...
1..3
# tests 3
# suites 0
# pass 2
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 58.199698
```
- PASS `test/v126-clean-renderer-migration.test.js`
- FAIL `test/v127-composer3-shell.test.js`
```text
TAP version 13
# /home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/src/ui/composer3-shell.js:52
#           Object.freeze({ label: 'Inspector', icon: '❉\#, selector: '[data-command="toggleInspector"]' }),
#                                                                      ^^^^^^^^^^^^
# SyntaxError: Invalid left-hand side in assignment
#     at wrapSafe (node:internal/modules/cjs/loader:1464:18)
#     at Module._compile (node:internal/modules/cjs/loader:1495:20)
#     at Module._extensions..js (node:internal/modules/cjs/loader:1623:10)
#     at Module.load (node:internal/modules/cjs/loader:1266:32)
#     at Module._load (node:internal/modules/cjs/loader:1091:12)
#     at Module.require (node:internal/modules/cjs/loader:1289:19)
#     at require (node:internal/modules/helpers:182:18)
#     at Object.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v127-composer3-shell.test.js:9:15)
#     at Module._compile (node:internal/modules/cjs/loader:1521:14)
#     at Module._extensions..js (node:internal/modules/cjs/loader:1623:10)
# Node.js v20.20.2
# Subtest: /home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v127-composer3-shell.test.js
not ok 1 - /home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v127-composer3-shell.test.js
  ---
  duration_ms: 41.109386
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v127-composer3-shell.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..1
# tests 1
# suites 0
# pass 0
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 46.225007
```

## Summary

- Passing test files: `27`
- Failing test files: `4`
- Audit conclusion: **FAIL**

Not tested by this audit: Windows compilation, installed application identity, visual staff obstruction, real mouse docking, PDF/PNG page inspection, performance, printer, MIDI, or audio hardware.

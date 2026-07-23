# Checkpoint 04 — Complete Composer 3 source audit

Repository: `ktheagent/Airmonlink-composer-3`
Branch: `main`
Commit: `a8899dc8418baacb4b897a10f54153d4bec544f8`
Node: `v20.20.2`
npm: `10.8.2`
Decision: **RELEASE BLOCKED**

This report is generated from the exact checked-out commit. The audit workflow writes only this report; it does not modify application source.

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

- PASS `npm run lint`

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
- PASS `test/v122-dedicated-publishing.test.js`
- PASS `test/v123-build16-publishing-exposure.test.js`
- FAIL `test/v124-build16-release-validator.test.js`
```text
TAP version 13
# Subtest: Build 18 release validator matches the direct verified publishing bootstrap
not ok 1 - Build 18 release validator matches the direct verified publishing bootstrap
  ---
  duration_ms: 4.288115
  location: '/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v124-build16-release-validator.test.js:8:1'
  failureType: 'testCodeFailure'
  error: |-
    The input was expected to not match the regular expression /release-bootstrap\.js|publishing-exposure\.js|publishing-ui\.js/. Input:
    
    'param(\n' +
      '  [string]$ReleaseDirectory = "release",\n' +
      '  [string]$ValidationDirectory = "validation",\n' +
      '  [int]$ExpectedBuild = 18\n' +
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
      '$package = Get-Content (Join-Path $root "package.json") -Raw | ConvertFrom-Json\n' +
      '$version = [string]$package.version\n' +
      '$buildNumber = [string]$package.buildNumber\n' +
      '$buildVersion = [string]$package.build.buildVersion\n' +
      '$expectedSetup = "Airmonlink-Composer-$version-Build$ExpectedBuild-Setup.exe"\n' +
      '$expectedPortable = "Airmonlink-Composer-$version-Build$ExpectedBuild-Portable.exe"\n' +
      '$setupPath = Join-Path $release $expectedSetup\n' +
      '$portablePath = Join-Path $release $expectedPortable\n' +
      '\n' +
      '$rows = [System.Collections.Generic.List[object]]::new()\n' +
      '\n' +
      'function Add-Row {\n' +
      '  param([string]$Name, [string]$Status, [string]$Details)\n' +
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
      'Assert-Check ($buildNumber -eq [string]$ExpectedBuild) `\n' +
      '  "Package build number" `\n' +
      '  "Expected $ExpectedBuild; found $buildNumber"\n' +
      '\n' +
      'Assert-Check ($buildVersion -eq "$version.$ExpectedBuild") `\n' +
      '  "Windows build version" `\n' +
      '  "Expected $version.$ExpectedBuild; found $buildVersion"\n' +
      '\n' +
      'Assert-Check ([string]$package.main -eq "src/bootstrap.js") `\n' +
      '  "Publishing bootstrap" `\n' +
      '  "Package entry point is $($package.main)"\n' +
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
      '  "src\\desktop\\publishing.js",\n' +
      '  "src\\ui\\index.html",\n' +
      '  "src\\ui\\publishing-controller.js",\n' +
      '  "src\\ui\\dock-manager.js",\n' +
      '  "test\\v122-dedicated-publishing.test.js",\n' +
      '  "test\\v125-build17-static-publishing.test.js"\n' +
      ')\n' +
      '\n' +
      'foreach ($relative in $requiredSource) {\n' +
      '  Assert-Check (Test-Path (Join-Path $root $relative)) `\n' +
      '    "Required source: $relative" `\n' +
      '    $relative\n' +
      '}\n' +
      '\n' +
      '$bootstrapPath = Join-Path $root "src\\bootstrap.js"\n' +
      '$controllerPath = Join-Path $root "src\\ui\\publishing-controller.js"\n' +
      '$htmlPath = Join-Path $root "src\\ui\\index.html"\n' +
      '\n' +
      '$bootstrapSource = if (Test-Path $bootstrapPath) {\n' +
      '  Get-Content $bootstrapPath -Raw\n' +
      '} else {\n' +
      '  ""\n' +
      '}\n' +
      '\n' +
      '$controllerSource = if (Test-Path $controllerPath) {\n' +
      '  Get-Content $controllerPath -Raw\n' +
      '} else {\n' +
      '  ""\n' +
      '}\n' +
      '\n' +
      '$htmlSource = if (Test-Path $htmlPath) {\n' +
      '  Get-Content $htmlPath -Raw\n' +
      '} else {\n' +
      '  ""\n' +
      '}\n' +
      '\n' +
      'Assert-Check ($bootstrapSource.Contains("const BUILD = $ExpectedBuild;")) `\n' +
      '  "Bootstrap build identity" `\n' +
      '  "src/bootstrap.js declares Build $ExpectedBuild"\n' +
      '\n' +
      'Assert-Check ($bootstrapSource.Contains("window.AirmonPublishingUI")) `\n' +
      '  "Publishing API verification" `\n' +
      '  "Bootstrap verifies the direct publishing API"\n' +
      '\n' +
      'Assert-Check ($bootstrapSource.Contains("window.AirmonDockManager")) `\n' +
      '  "Docking API verification" `\n' +
      '  "Bootstrap verifies the direct docking API"\n' +
      '\n' +
      'Assert-Check ($bootstrapSource.Contains("native-ui-ready")) `\n' +
      '  "Renderer verification logging" `\n' +
      '  "Bootstrap records native-ui-ready"\n' +
      '\n' +
      'Assert-Check ($bootstrapSource.Contains("publishingResult.pdfControls < 2")) `\n' +
      '  "PDF control verification" `\n' +
      '  "Bootstrap requires at least two PDF controls"\n' +
      '\n' +
      'Assert-Check ($bootstrapSource.Contains("publishingResult.pngControls < 2")) `\n' +
      '  "PNG control verification" `\n' +
      '  "Bootstrap requires at least two PNG controls"\n' +
      '\n' +
      'Assert-Check (-not $bootstrapSource.Contains("publishing-exposure.js")) `\n' +
      '  "Legacy exposure disabled" `\n' +
      '  "Bootstrap does not load publishing-exposure.js"\n' +
      '\n' +
      'Assert-Check (-not $bootstrapSource.Contains("publishing-ui.js")) `\n' +
      '  "Legacy publishing UI disabled" `\n' +
      '  "Bootstrap does not load publishing-ui.js"\n' +
      '\n' +
      'Assert-Check ($controllerSource.Contains("const BUILD = $ExpectedBuild;")) `\n' +
      '  "Publishing controller build identity" `\n' +
      '  "publishing-controller.js declares Build $ExpectedBuild"\n' +
      '\n' +
      'Assert-Check ($controllerSource.Contains("window.AirmonPublishingUI")) `\n' +
      '  "Publishing controller API" `\n' +
      '  "publishing-controller.js exposes AirmonPublishingUI"\n' +
      '\n' +
      'Assert-Check ($controllerSource.Contains("beginPdf")) `\n' +
      '  "Dedicated PDF controller" `\n' +
      '  "publishing-controller.js exposes beginPdf"\n' +
      '\n' +
      'Assert-Check ($controllerSource.Contains("beginPng")) `\n' +
      '  "PNG pages controller" `\n' +
      '  "publishing-controller.js exposes beginPng"\n' +
      '\n' +
      'Assert-Check ($controllerSource.Contains("showPngPage")) `\n' +
      '  "PNG page selection" `\n' +
      '  "publishing-controller.js exposes showPngPage"\n' +
      '\n' +
      'Assert-Check (-not $controllerSource.Contains("MutationObserver")) `\n' +
      '  "No whole-document publishing observer" `\n' +
      '  "publishing-controller.js does not use MutationObserver"\n' +
      '\n' +
      'Assert-Check ($htmlSource.Contains("Dedicated PDF")) `\n' +
      '  "Dedicated PDF visible source" `\n' +
      '  "index.html contains Dedicated PDF controls"\n' +
      '\n' +
      'Assert-Check ($htmlSource.Contains("PNG Pages")) `\n' +
      '  "PNG pages visible source" `\n' +
      '  "index.html contains PNG Pages controls"\n' +
      '\n' +
      'Assert-Check ($htmlSource.Contains("System Print")) `\n' +
      '  "System print visible source" `\n' +
      '  "index.html contains System Print controls"\n' +
      '\n' +
      'Assert-Check ($htmlSource.Contains("data-build-18-badge")) `\n' +
      '  "Build 18 badge source" `\n' +
      '  "index.html contains the Build 18 badge marker"\n' +
      '\n' +
      'Assert-Check (Test-Path $setupPath) `\n' +
      '  "Setup artifact exists" `\n' +
      '  $setupPath\n' +
      '\n' +
      'Assert-Check (Test-Path $portablePath) `\n' +
      '  "Portable artifact exists" `\n' +
      '  $portablePath\n' +
      '\n' +
      'function Test-PEFile {\n' +
      '  param([string]$Path)\n' +
      '\n' +
      '  if (-not (Test-Path $Path)) {\n' +
      '    return $false\n' +
      '  }\n' +
      '\n' +
      '  $stream = [System.IO.File]::OpenRead($Path)\n' +
      '  try {\n' +
      '    if ($stream.Length -lt 1024) {\n' +
      '      return $false\n' +
      '    }\n' +
      '\n' +
      '    $reader = [System.IO.BinaryReader]::new($stream)\n' +
      '    if ($reader.ReadUInt16() -ne 0x5A4D) {\n' +
      '      return $false\n' +
      '    }\n' +
      '\n' +
      '    $stream.Position = 0x3C\n' +
      '    $peOffset = $reader.ReadInt32()\n' +
      '    if ($peOffset -lt 64 -or $peOffset -gt ($stream.Length - 4)) {\n' +
      '      return $false\n' +
      '    }\n' +
      '\n' +
      '    $stream.Position = $peOffset\n' +
      '    return $reader.ReadUInt32() -eq 0x00004550\n' +
      '  } finally {\n' +
      '    $stream.Dispose()\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      'Assert-Check (Test-PEFile $setupPath) `\n' +
      '  "Setup PE validation" `\n' +
      '  "MZ and PE magic signatures"\n' +
      '\n' +
      'Assert-Check (Test-PEFile $portablePath) `\n' +
      '  "Portable PE validation" `\n' +
      '  "MZ and PE magic signatures"\n' +
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
      '\n' +
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
      '  $previousValidationLog = $env:AIRMONLINK_VALIDATION_LOG\n' +
      '  try {\n' +
      '    $env:AIRMONLINK_VALIDATION_LOG = $rendererLog\n' +
      '    $process = Start-Process -FilePath $portablePath -PassThru\n' +
      '  } finally {\n' +
      '    if ($null -eq $previousValidationLog) {\n' +
      '      Remove-Item Env:AIRMONLINK_VALIDATION_LOG -ErrorAction SilentlyContinue\n' +
      '    } else {\n' +
      '      $env:AIRMONLINK_VALIDATION_LOG = $previousValidationLog\n' +
      '    }\n' +
      '  }\n' +
      '\n' +
      '  Start-Sleep -Seconds 10\n' +
      '  $alive = -not $process.HasExited\n' +
      '  Assert-Check $alive `\n' +
      '    "Portable launch smoke test" `\n' +
      '    "Process started and remained alive for 10 seconds"\n' +
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
      '    Where-Object { $_.stage -eq "native-ui-ready" } |\n' +
      '    Select-Object -Last 1\n' +
      '\n' +
      '  Assert-Check ($null -ne $ready) `\n' +
      '    "Built renderer native UI proof" `\n' +
      '    "Portable executable reported native-ui-ready"\n' +
      '\n' +
      '  if ($null -ne $ready) {\n' +
      '    $publishingReady = $ready.publishing\n' +
      '    $dockingReady = $ready.docking\n' +
      '\n' +
      '    Assert-Check ($null -ne $publishingReady) `\n' +
      '      "Built renderer publishing record" `\n' +
      '      "native-ui-ready contains publishing details"\n' +
      '\n' +
      '    Assert-Check ($null -ne $dockingReady) `\n' +
      '      "Built renderer docking record" `\n' +
      '      "native-ui-ready contains docking details"\n' +
      '\n' +
      '    if ($null -ne $publishingReady) {\n' +
      '      Assert-Check ([int]$publishingReady.build -eq $ExpectedBuild) `\n' +
      '        "Built renderer build identity" `\n' +
      '        "Renderer reported Build $($publishingReady.build)"\n' +
      '\n' +
      '      Assert-Check ([bool]$publishingReady.api) `\n' +
      '        "Built renderer publishing API" `\n' +
      '        "Renderer publishing API is active"\n' +
      '\n' +
      '      Assert-Check ([bool]$publishingReady.native) `\n' +
      '        "Built renderer native controls" `\n' +
      '        "Renderer reported native publishing controls"\n' +
      '\n' +
      '      Assert-Check ([int]$publishingReady.pdfControls -ge 2) `\n' +
      '        "Built renderer PDF controls" `\n' +
      '        "Renderer reported $($publishingReady.pdfControls) PDF controls"\n' +
      '\n' +
      '      Assert-Check ([int]$publishingReady.pngControls -ge 2) `\n' +
      '        "Built renderer PNG controls" `\n' +
      '        "Renderer reported $($publishingReady.pngControls) PNG controls"\n' +
      '\n' +
      '      Assert-Check ([bool]$publishingReady.badge) `\n' +
      '        "Built renderer Build 18 badge" `\n' +
      '        "Renderer reported a visible Build 18 badge"\n' +
      '\n' +
      '      Assert-Check ([bool]$publishingReady.status) `\n' +
      '        "Built renderer publish'... 2154 more characters
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: |-
    param(
      [string]$ReleaseDirectory = "release",
      [string]$ValidationDirectory = "validation",
      [int]$ExpectedBuild = 18
    )
    
    $ErrorActionPreference = "Stop"
    Set-StrictMode -Version Latest
    
    $root = (Resolve-Path ".").Path
    $release = Join-Path $root $ReleaseDirectory
    $validation = Join-Path $root $ValidationDirectory
    New-Item -ItemType Directory -Force $validation | Out-Null
    
    $package = Get-Content (Join-Path $root "package.json") -Raw | ConvertFrom-Json
    $version = [string]$package.version
    $buildNumber = [string]$package.buildNumber
    $buildVersion = [string]$package.build.buildVersion
    $expectedSetup = "Airmonlink-Composer-$version-Build$ExpectedBuild-Setup.exe"
    $expectedPortable = "Airmonlink-Composer-$version-Build$ExpectedBuild-Portable.exe"
    $setupPath = Join-Path $release $expectedSetup
    $portablePath = Join-Path $release $expectedPortable
    
    $rows = [System.Collections.Generic.List[object]]::new()
    
    function Add-Row {
      param([string]$Name, [string]$Status, [string]$Details)
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
    
    Assert-Check ($buildNumber -eq [string]$ExpectedBuild) `
      "Package build number" `
      "Expected $ExpectedBuild; found $buildNumber"
    
    Assert-Check ($buildVersion -eq "$version.$ExpectedBuild") `
      "Windows build version" `
      "Expected $version.$ExpectedBuild; found $buildVersion"
    
    Assert-Check ([string]$package.main -eq "src/bootstrap.js") `
      "Publishing bootstrap" `
      "Package entry point is $($package.main)"
    
    Assert-Check ([string]$package.build.nsis.artifactName -match "Build$ExpectedBuild") `
      "Installer naming" `
      ([string]$package.build.nsis.artifactName)
    
    Assert-Check ([string]$package.build.portable.artifactName -match "Build$ExpectedBuild") `
      "Portable naming" `
      ([string]$package.build.portable.artifactName)
    
    $requiredSource = @(
      "src\bootstrap.js",
      "src\desktop\publishing.js",
      "src\ui\index.html",
      "src\ui\publishing-controller.js",
      "src\ui\dock-manager.js",
      "test\v122-dedicated-publishing.test.js",
      "test\v125-build17-static-publishing.test.js"
    )
    
    foreach ($relative in $requiredSource) {
      Assert-Check (Test-Path (Join-Path $root $relative)) `
        "Required source: $relative" `
        $relative
    }
    
    $bootstrapPath = Join-Path $root "src\bootstrap.js"
    $controllerPath = Join-Path $root "src\ui\publishing-controller.js"
    $htmlPath = Join-Path $root "src\ui\index.html"
    
    $bootstrapSource = if (Test-Path $bootstrapPath) {
      Get-Content $bootstrapPath -Raw
    } else {
      ""
    }
    
    $controllerSource = if (Test-Path $controllerPath) {
      Get-Content $controllerPath -Raw
    } else {
      ""
    }
    
    $htmlSource = if (Test-Path $htmlPath) {
      Get-Content $htmlPath -Raw
    } else {
      ""
    }
    
    Assert-Check ($bootstrapSource.Contains("const BUILD = $ExpectedBuild;")) `
      "Bootstrap build identity" `
      "src/bootstrap.js declares Build $ExpectedBuild"
    
    Assert-Check ($bootstrapSource.Contains("window.AirmonPublishingUI")) `
      "Publishing API verification" `
      "Bootstrap verifies the direct publishing API"
    
    Assert-Check ($bootstrapSource.Contains("window.AirmonDockManager")) `
      "Docking API verification" `
      "Bootstrap verifies the direct docking API"
    
    Assert-Check ($bootstrapSource.Contains("native-ui-ready")) `
      "Renderer verification logging" `
      "Bootstrap records native-ui-ready"
    
    Assert-Check ($bootstrapSource.Contains("publishingResult.pdfControls < 2")) `
      "PDF control verification" `
      "Bootstrap requires at least two PDF controls"
    
    Assert-Check ($bootstrapSource.Contains("publishingResult.pngControls < 2")) `
      "PNG control verification" `
      "Bootstrap requires at least two PNG controls"
    
    Assert-Check (-not $bootstrapSource.Contains("publishing-exposure.js")) `
      "Legacy exposure disabled" `
      "Bootstrap does not load publishing-exposure.js"
    
    Assert-Check (-not $bootstrapSource.Contains("publishing-ui.js")) `
      "Legacy publishing UI disabled" `
      "Bootstrap does not load publishing-ui.js"
    
    Assert-Check ($controllerSource.Contains("const BUILD = $ExpectedBuild;")) `
      "Publishing controller build identity" `
      "publishing-controller.js declares Build $ExpectedBuild"
    
    Assert-Check ($controllerSource.Contains("window.AirmonPublishingUI")) `
      "Publishing controller API" `
      "publishing-controller.js exposes AirmonPublishingUI"
    
    Assert-Check ($controllerSource.Contains("beginPdf")) `
      "Dedicated PDF controller" `
      "publishing-controller.js exposes beginPdf"
    
    Assert-Check ($controllerSource.Contains("beginPng")) `
      "PNG pages controller" `
      "publishing-controller.js exposes beginPng"
    
    Assert-Check ($controllerSource.Contains("showPngPage")) `
      "PNG page selection" `
      "publishing-controller.js exposes showPngPage"
    
    Assert-Check (-not $controllerSource.Contains("MutationObserver")) `
      "No whole-document publishing observer" `
      "publishing-controller.js does not use MutationObserver"
    
    Assert-Check ($htmlSource.Contains("Dedicated PDF")) `
      "Dedicated PDF visible source" `
      "index.html contains Dedicated PDF controls"
    
    Assert-Check ($htmlSource.Contains("PNG Pages")) `
      "PNG pages visible source" `
      "index.html contains PNG Pages controls"
    
    Assert-Check ($htmlSource.Contains("System Print")) `
      "System print visible source" `
      "index.html contains System Print controls"
    
    Assert-Check ($htmlSource.Contains("data-build-18-badge")) `
      "Build 18 badge source" `
      "index.html contains the Build 18 badge marker"
    
    Assert-Check (Test-Path $setupPath) `
      "Setup artifact exists" `
      $setupPath
    
    Assert-Check (Test-Path $portablePath) `
      "Portable artifact exists" `
      $portablePath
    
    function Test-PEFile {
      param([string]$Path)
    
      if (-not (Test-Path $Path)) {
        return $false
      }
    
      $stream = [System.IO.File]::OpenRead($Path)
      try {
        if ($stream.Length -lt 1024) {
          return $false
        }
    
        $reader = [System.IO.BinaryReader]::new($stream)
        if ($reader.ReadUInt16() -ne 0x5A4D) {
          return $false
        }
    
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
    
    Assert-Check (Test-PEFile $setupPath) `
      "Setup PE validation" `
      "MZ and PE magic signatures"
    
    Assert-Check (Test-PEFile $portablePath) `
      "Portable PE validation" `
      "MZ and PE magic signatures"
    
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
      $previousValidationLog = $env:AIRMONLINK_VALIDATION_LOG
      try {
        $env:AIRMONLINK_VALIDATION_LOG = $rendererLog
        $process = Start-Process -FilePath $portablePath -PassThru
      } finally {
        if ($null -eq $previousValidationLog) {
          Remove-Item Env:AIRMONLINK_VALIDATION_LOG -ErrorAction SilentlyContinue
        } else {
          $env:AIRMONLINK_VALIDATION_LOG = $previousValidationLog
        }
      }
    
      Start-Sleep -Seconds 10
      $alive = -not $process.HasExited
      Assert-Check $alive `
        "Portable launch smoke test" `
        "Process started and remained alive for 10 seconds"
    
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
        Where-Object { $_.stage -eq "native-ui-ready" } |
        Select-Object -Last 1
    
      Assert-Check ($null -ne $ready) `
        "Built renderer native UI proof" `
        "Portable executable reported native-ui-ready"
    
      if ($null -ne $ready) {
        $publishingReady = $ready.publishing
        $dockingReady = $ready.docking
    
        Assert-Check ($null -ne $publishingReady) `
          "Built renderer publishing record" `
          "native-ui-ready contains publishing details"
    
        Assert-Check ($null -ne $dockingReady) `
          "Built renderer docking record" `
          "native-ui-ready contains docking details"
    
        if ($null -ne $publishingReady) {
          Assert-Check ([int]$publishingReady.build -eq $ExpectedBuild) `
            "Built renderer build identity" `
            "Renderer reported Build $($publishingReady.build)"
    
          Assert-Check ([bool]$publishingReady.api) `
            "Built renderer publishing API" `
            "Renderer publishing API is active"
    
          Assert-Check ([bool]$publishingReady.native) `
            "Built renderer native controls" `
            "Renderer reported native publishing controls"
    
          Assert-Check ([int]$publishingReady.pdfControls -ge 2) `
            "Built renderer PDF controls" `
            "Renderer reported $($publishingReady.pdfControls) PDF controls"
    
          Assert-Check ([int]$publishingReady.pngControls -ge 2) `
            "Built renderer PNG controls" `
            "Renderer reported $($publishingReady.pngControls) PNG controls"
    
          Assert-Check ([bool]$publishingReady.badge) `
            "Built renderer Build 18 badge" `
            "Renderer reported a visible Build 18 badge"
    
          Assert-Check ([bool]$publishingReady.status) `
            "Built renderer publishing status" `
            "Renderer reported visible publishing status"
        }
    
        if ($null -ne $dockingReady) {
          Assert-Check ([int]$dockingReady.handles -ge 3) `
            "Built renderer docking handles" `
            "Renderer reported $($dockingReady.handles) docking handles"
    
          Assert-Check ([bool]$dockingReady.dropZone) `
            "Built renderer docking drop zone" `
            "Renderer reported an active docking drop zone"
    
          Assert-Check ([int]$dockingReady.panels -ge 3) `
            "Built renderer docking panels" `
            "Renderer reported $($dockingReady.panels) dockable panels"
        }
      }
    
      if ($alive) {
        $process.CloseMainWindow() | Out-Null
        Start-Sleep -Seconds 3
        if (-not $process.HasExited) {
          Stop-Process -Id $process.Id -Force
        }
      }
    }
    
    Add-Row "Human GUI inspection" "BLOCKED" `
      "Requires a person to inspect the installed Windows interface."
    
    Add-Row "PDF file opening" "BLOCKED" `
      "Requires opening an exported PDF in a Windows PDF viewer."
    
    Add-Row "PNG sequence inspection" "BLOCKED" `
      "Requires visually inspecting exported PNG pages."
    
    Add-Row "MIDI hardware" "BLOCKED" `
      "Requires physical MIDI hardware."
    
    Add-Row "Audio device" "BLOCKED" `
      "Requires physical audio output."
    
    Add-Row "Code-signing trust" "BLOCKED" `
      "No signing certificate was supplied."
    
    $jsonPath = Join-Path $validation "windows-release-validation.json"
    $csvPath = Join-Path $validation "windows-release-validation.csv"
    $textPath = Join-Path $validation "windows-release-validation.txt"
    
    $rows | ConvertTo-Json -Depth 6 | Set-Content -Encoding utf8 $jsonPath
    $rows | Export-Csv -NoTypeInformation -Encoding utf8 $csvPath
    $rows | Format-Table -AutoSize | Out-String |
      Set-Content -Encoding utf8 $textPath
    
    $failures = @($rows | Where-Object Status -eq "FAIL")
    if ($failures.Count -gt 0) {
      $failures | Format-Table -AutoSize
      throw "Windows release validation found $($failures.Count) FAIL row(s)."
    }
    
    "OK" | Set-Content -Encoding ascii (
      Join-Path $validation "windows-validation.ok"
    )
    
    Write-Host (
      "Windows validation completed without FAIL rows. " +
      "BLOCKED rows remain explicitly reported."
    )
    exit 0
    
  operator: 'doesNotMatch'
  stack: |-
    TestContext.<anonymous> (/home/runner/work/Airmonlink-composer-3/Airmonlink-composer-3/test/v124-build16-release-validator.test.js:32:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
    AsyncResource.runInAsyncScope (node:async_hooks:206:9)
    AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)
  ...
1..1
# tests 1
# suites 0
# pass 0
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 57.245667
```
- PASS `test/v125-build17-static-publishing.test.js`
- PASS `test/v126-clean-renderer-migration.test.js`

## Summary

- Passing test files: `29`
- Failing test files: `1`
- Audit conclusion: **FAIL**

Not tested by this audit: Windows compilation, installed application identity, visual staff obstruction, real mouse docking, PDF/PNG page inspection, performance, printer, MIDI, or audio hardware.

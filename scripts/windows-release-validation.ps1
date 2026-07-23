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

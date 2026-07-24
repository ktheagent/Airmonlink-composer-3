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

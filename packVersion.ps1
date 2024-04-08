$moduleID = "lyynix-more-journal-enrichers"
$temp = "../temp"

$module = (Get-Content "./module.json" | Out-String | ConvertFrom-Json)
Write-Output "Found version ", $module.version

$version = $module.version -replace "\.", "_"
$dest = "./releases/v$version"

Write-Output "Testing path $dest"
if (Test-Path -Path $dest) {
  Write-Host "This version already got packed. Press anything to exit" -foregroundcolor red
  Read-Host
  exit
}

$downloadUrl = $module.download
if ($downloadUrl -notmatch $version) {
  Write-Host "The download URL in module.json is not correct" -foregroundcolor red
  Read-Host
  exit
}

if ((Read-Host -Prompt "Continue packing version $version? (Y/N)") -eq "N") {
  exit
}

Write-Host "Started copying module"
Copy-Item -Path "./" -Destination "$temp/$moduleID" -Recurse
Write-Host "Successfully copied module to temporary folder" -foregroundcolor green

Write-Host "Now removing unwanted directories and files"
Remove-Item -Path "$temp/$moduleID/.github" -Recurse
Remove-Item -Path "$temp/$moduleID/.git" -Recurse -Force
Remove-Item -Path "$temp/$moduleID/releases" -Recurse
Remove-Item -Path "$temp/$moduleID/.gitignore" -Recurse
Remove-Item -Path "$temp/$moduleID/lmje.code-workspace" -Recurse
Remove-Item -Path "$temp/$moduleID/lyynix-more-journal-enrichers.lock" -Recurse
Remove-Item -Path "$temp/$moduleID/packVersion.ps1" -Recurse
Write-Host "Successfully removed" -ForegroundColor Green

Write-Host "Now compressing Archive and finishing routine"
New-Item $dest -ItemType "directory"
Compress-Archive -Path "$temp/$moduleID" -DestinationPath "$dest/lmje-v$version.zip"
Copy-Item -Path "./module.json" -Destination "$dest/manifest.json"

Write-Host "Now deleting temp directory"
Remove-Item -Path $temp -Recurse -Force
Write-Host "Finished!" -foregroundcolor darkgreen

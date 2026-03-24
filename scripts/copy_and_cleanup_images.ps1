# Copy images from HTTrack cache to assets and cleanup
$basePath = "c:\Users\ilaga\OneDrive\localhost\lcec"
$sourceDir = "$basePath\img1.wsimg.com\isteam\ip\a821e253-f35c-44be-8830-fee736225438"
$destDir = "$basePath\assets\images"

# Create destination directory if it doesn't exist
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    Write-Host "Created directory: $destDir"
}

# Get all files from source directory recursively
$files = Get-ChildItem -Path $sourceDir -Recurse -File

if ($files.Count -eq 0) {
    Write-Host "No files found in source directory"
    exit
}

Write-Host "Found $($files.Count) files to copy..."

# Copy all files to destination, preserving structure
foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($sourceDir.Length + 1)
    $destPath = Join-Path $destDir $relativePath
    $destFolder = Split-Path $destPath
    
    # Create subdirectory if needed
    if (!(Test-Path $destFolder)) {
        New-Item -ItemType Directory -Path $destFolder -Force | Out-Null
    }
    
    # Copy file
    Copy-Item -Path $file.FullName -Destination $destPath -Force
    Write-Host "Copied: $relativePath"
}

Write-Host "`nCopy complete: $($files.Count) files copied to $destDir"

# List files in assets/images to verify
Write-Host "`nVerifying copied files..."
$copiedFiles = Get-ChildItem -Path $destDir -Recurse -File
Write-Host "Total files in assets/images: $($copiedFiles.Count)"

# Cleanup: Remove the original HTTrack cache directory
Write-Host "`nRemoving original HTTrack cache directory..."
$httrackDir = "$basePath\img1.wsimg.com"
if (Test-Path $httrackDir) {
    Remove-Item -Path $httrackDir -Recurse -Force
    Write-Host "Deleted: $httrackDir"
}

Write-Host "`nCleanup complete!"

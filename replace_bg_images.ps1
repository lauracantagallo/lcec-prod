# Script to replace CSS background image URLs
$basePath = "c:\Users\ilaga\OneDrive\localhost\lcec\lceducationconsulting.com"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $basePath -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)..."
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    
    # Replace background-image URLs from Wix stock images
    # These are in CSS media queries
    $content = $content -replace 'url\("https://img1\.wsimg\.com/isteam/stock/\d+/[^"]*"', 'url("/assets/images/background-stock.jpg"'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "  Updated background images: $($file.Name)"
    } else {
        Write-Host "  No background image changes: $($file.Name)"
    }
}

Write-Host "`nDone!"

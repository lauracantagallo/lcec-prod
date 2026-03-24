# Replace all image references with SVG equivalents
$basePath = "c:\Users\ilaga\OneDrive\localhost\lcec\lceducationconsulting.com"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $basePath -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)..."
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace favicon paths with single SVG
    $content = $content -replace '/assets/images/favicon/[^"'']*\.png', '/assets/images/favicon.svg'
    
    # Replace LC LOGO references with SVG
    $content = $content -replace '/assets/images/LC LOGO-3adc54b\.(png|jpg)', '/assets/images/lc-logo.svg'
    $content = $content -replace '/assets/images/lc-logo\.jpg', '/assets/images/lc-logo.svg'
    
    # Replace background images with SVG pattern
    $content = $content -replace '/assets/images/background-stock\.jpg', '/assets/images/background-pattern.svg'
    $content = $content -replace '/assets/images/blob-c1fdc46\.png', '/assets/images/background-pattern.svg'
    
    # Replace profile/content images with avatar placeholder
    $content = $content -replace '/assets/images/IMG_7012\.tiff', '/assets/images/avatar-placeholder.svg'
    $content = $content -replace '/assets/images/Image\.png', '/assets/images/avatar-placeholder.svg'
    
    Set-Content -Path $file.FullName -Value $content
    Write-Host "  Updated: $($file.Name)"
}

Write-Host "`nAll HTML files updated with SVG references!"

# Script to replace all external asset URLs with local paths
$basePath = "c:\Users\ilaga\OneDrive\localhost\lcec\lceducationconsulting.com"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $basePath -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)..."
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    
    # Replace Google Fonts CDN URLs with local paths
    $content = $content -replace "https://img1\.wsimg\.com/gfonts/s/[^/]+/[^/]+/([^)]+)\.woff2", "/assets/fonts/`$1.woff2"
    
    # Replace image URLs - Wix isteam URLs (many variations)
    $content = $content -replace "https?://img1\.wsimg\.com/isteam/ip/a821e253-f35c-44be-8830-fee736225438/([^/`"' ]+)", "/assets/images/`$1"
    $content = $content -replace "https?://img1\.wsimg\.com/isteam/ip/a821e253-f35c-44be-8830-fee736225438/([^`"' ]+)", "/assets/images/`$1"
    
    # Replace favicon URLs
    $content = $content -replace "http://img1\.wsimg\.com/isteam/ip/a821e253-f35c-44be-8830-fee736225438/favicon[^`"' ]*", "/assets/images/favicon"
    
    # Replace relative paths that start with ../img1.wsimg.com
    $content = $content -replace "\.\./img1\.wsimg\.com/isteam/ip/a821e253-f35c-44be-8830-fee736225438/([^`"' ]+)", "/assets/images/`$1"
    
    # Replace LC LOGO specifically (URL encoded space)
    $content = $content -replace "LC%20LOGO-3adc54b\.(png|jpg)", "lc-logo.`$1"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "  Updated: $($file.Name)"
    } else {
        Write-Host "  No changes: $($file.Name)"
    }
}

Write-Host "`nDone!"

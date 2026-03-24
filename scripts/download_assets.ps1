# Script to download missing assets for LC Education Consulting website

$baseDir = "c:\Users\ilaga\OneDrive\localhost\lcec"
$assetDir = "$baseDir\assets"

# Create assets directory structure
New-Item -ItemType Directory -Path "$assetDir\fonts" -Force | Out-Null
New-Item -ItemType Directory -Path "$assetDir\images" -Force | Out-Null

# List of font URLs to download
$fonts = @(
    "https://img1.wsimg.com/gfonts/s/cabin/v35/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkbqDH7mlx17r.woff2",
    "https://img1.wsimg.com/gfonts/s/cabin/v35/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkbqDH7ilx17r.woff2",
    "https://img1.wsimg.com/gfonts/s/cabin/v35/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkbqDH7alxw.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u8w4BMUTPHjxsAUi-qJCY.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u8w4BMUTPHjxsAXC-q.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u_w4BMUTPHjxsI5wq_FQft1dw.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u_w4BMUTPHjxsI5wq_Gwft.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u8w4BMUTPHh30AUi-qJCY.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u8w4BMUTPHh30AXC-q.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u9w4BMUTPHh7USSwaPGR_p.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u9w4BMUTPHh7USSwiPGQ.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6uyw4BMUTPHjxAwXjeu.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6uyw4BMUTPHjx4wXg.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u9w4BMUTPHh6UVSwaPGR_p.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u9w4BMUTPHh6UVSwiPGQ.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u9w4BMUTPHh50XSwaPGR_p.woff2",
    "https://img1.wsimg.com/gfonts/s/lato/v25/S6u9w4BMUTPHh50XSwiPGQ.woff2",
    "https://img1.wsimg.com/gfonts/s/bitter/v40/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8RHYOLXOXWh2.woff2",
    "https://img1.wsimg.com/gfonts/s/bitter/v40/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8RHYOLzOXWh2.woff2",
    "https://img1.wsimg.com/gfonts/s/bitter/v40/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8RHYOLfOXWh2.woff2",
    "https://img1.wsimg.com/gfonts/s/bitter/v40/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8RHYOLbOXWh2.woff2"
)

# List of image URLs to download
$images = @(
    @{url="http://img1.wsimg.com/isteam/ip/a821e253-f35c-44be-8830-fee736225438/favicon/f039aa94-b58f-409f-900a-ec04681a38b4/c1a899f1-b4ae-4182-965f-603fc9e6cab4.png"; name="favicon.png"},
    @{url="http://img1.wsimg.com/isteam/ip/a821e253-f35c-44be-8830-fee736225438/LC LOGO-3adc54b.png"; name="lc-logo.png"},
    @{url="http://img1.wsimg.com/isteam/ip/a821e253-f35c-44be-8830-fee736225438/LC LOGO-3adc54b.jpg"; name="lc-logo.jpg"},
    @{url="http://img1.wsimg.com/isteam/ip/a821e253-f35c-44be-8830-fee736225438/IMG_7012.tiff"; name="IMG_7012.tiff"},
    @{url="http://img1.wsimg.com/isteam/ip/a821e253-f35c-44be-8830-fee736225438/Image.png"; name="career-image.png"}
)

Write-Host "Downloading fonts..." -ForegroundColor Green
$fontCount = 0
foreach ($fontUrl in $fonts) {
    $fileName = [System.IO.Path]::GetFileName($fontUrl.Split('?')[0])
    $outputPath = "$assetDir\fonts\$fileName"
    
    if (!(Test-Path $outputPath)) {
        try {
            Write-Host "  Downloading: $fileName"
            Invoke-WebRequest -Uri $fontUrl -OutFile $outputPath -ErrorAction Stop
            $fontCount++
        } catch {
            Write-Host "  ✗ Failed to download $fileName : $_" -ForegroundColor Red
        }
    } else {
        Write-Host "  ✓ Already exists: $fileName"
    }
}

Write-Host "Downloading images..." -ForegroundColor Green
$imageCount = 0
foreach ($image in $images) {
    $outputPath = "$assetDir\images\$($image.name)"
    
    if (!(Test-Path $outputPath)) {
        try {
            Write-Host "  Downloading: $($image.name)"
            Invoke-WebRequest -Uri $image.url -OutFile $outputPath -ErrorAction Stop
            $imageCount++
        } catch {
            Write-Host "  ✗ Failed to download $($image.name) : $_" -ForegroundColor Red
        }
    } else {
        Write-Host "  ✓ Already exists: $($image.name)"
    }
}

Write-Host "`nDownload Summary:" -ForegroundColor Cyan
Write-Host "  Fonts downloaded: $fontCount"
Write-Host "  Images downloaded: $imageCount"
Write-Host "  Assets location: $assetDir"
Write-Host "`nNext: Update HTML files to reference local assets instead of remote URLs."

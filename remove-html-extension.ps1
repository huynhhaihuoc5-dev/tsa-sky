# Script tự động loại bỏ .html khỏi tất cả links
# Chạy: .\remove-html-extension.ps1

$files = Get-ChildItem -Path "." -Include "*.html","*.js" -Recurse

$totalFiles = 0
$totalReplacements = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Replace href="*.html" với href="*" (loại bỏ .html)
    $content = $content -replace 'href="([^"]+)\.html"', 'href="$1"'
    
    # Replace href='*.html' với href='*'
    $content = $content -replace "href='([^']+)\.html'", "href='`$1'"
    
    # Replace window.location.href = "*.html"
    $content = $content -replace 'window\.location\.href\s*=\s*"([^"]+)\.html"', 'window.location.href = "$1"'
    
    # Replace window.location.href = '*.html'
    $content = $content -replace "window\.location\.href\s*=\s*'([^']+)\.html'", "window.location.href = '`$1'"
    
    # Nếu có thay đổi, ghi lại file
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $changes = ($originalContent.Length - $content.Length) / 5  # Ước tính số thay đổi
        Write-Host "✅ Updated: $($file.Name) (~$([math]::Round($changes)) changes)" -ForegroundColor Green
        $totalFiles++
        $totalReplacements += $changes
    }
}

Write-Host "`n📊 SUMMARY:" -ForegroundColor Cyan
Write-Host "Files updated: $totalFiles" -ForegroundColor Yellow
Write-Host "Estimated replacements: ~$([math]::Round($totalReplacements))" -ForegroundColor Yellow
Write-Host "`n✅ Done! All .html extensions removed from links." -ForegroundColor Green
Write-Host "`n⚠️  Note: Test your website after uploading!" -ForegroundColor Yellow

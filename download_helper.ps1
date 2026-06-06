# Helper script to download images
function Download-Image(\, \) {
    try {
         = New-Object System.Net.WebClient
        .DownloadFile(, )
        Write-Host \"Saved: \"
    } catch {
        Write-Host \"Failed: \"
    }
}

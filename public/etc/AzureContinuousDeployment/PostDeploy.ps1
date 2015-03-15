Param(
  [string]$siteUrl
)

try
{
   Write-Host "Querying the web site: $siteUrl"
   $time = [System.Diagnostics.Stopwatch]::StartNew()
   $response = Invoke-WebRequest -Method Get -Uri $siteUrl -TimeoutSec 120 -UseBasicParsing

   $elapsedTime = $time.Elapsed.TotalMilliseconds
   $statusCode = $response.StatusCode
   $contentLength = $response.RawContentLength
   Write-Host "Received status code $statusCode with $contentLength bytes in $elapsedTime ms"

   Write-Host "Updating the site url in the tests config file $env:TF_BUILD_BUILDDIRECTORY"
   gci -Path $env:TF_BUILD_BUILDDIRECTORY -Filter "MpgMeter.com.IntegrationTests.dll.config" -Recurse | %{
        Write-Host "  -> Changing $($_.FullName)"
         
        # remove the read-only bit on the file
        sp $_.FullName IsReadOnly $false
 
        # run the regex replace
        # if this is changed be sure to upate it in the App.config of hte Integration Tests
        (gc $_.FullName).replace("http://localhost:8080/", $siteUrl) | sc $_.FullName
    }
}
catch {
    Write-Host $_
    exit 1
}

Param(
  [string]$pathToSearch = $env:TF_BUILD_SOURCESDIRECTORY,
  [string]$changeset = $env:TF_BUILD_SOURCEGETVERSION
)

try
{
    [string]$pattern = ".0.0.0"""
    $changeset = $changeset.Replace("C", "")
    $extractedBuildNumber = ".0.0." + $changeset + """"
    Write-Host "Using version $changeset"
 
    gci -Path $pathToSearch -Filter "AssemblyVersionInfo.*" -Recurse | %{
        Write-Host "  -> Changing $($_.FullName)"
         
        # remove the read-only bit on the file
        sp $_.FullName IsReadOnly $false
 
        # run the regex replace
        (gc $_.FullName).replace($pattern, $extractedBuildNumber) | sc $_.FullName
    }

    gci -Path $pathToSearch -Filter "WMAppManifest.xml" -Recurse | %{
        Write-Host "  -> Changing $($_.FullName)"
         
        # remove the read-only bit on the file
        sp $_.FullName IsReadOnly $false
 
        # run the regex replace
        (gc $_.FullName).replace($pattern, $extractedBuildNumber) | sc $_.FullName
    }

    Write-Host "Updating the AzureTest configuration key from MpgMeter_AzureTest to MpgMeter_Test for database tests $pathToSearch"
    gci -Path $pathToSearch -Filter "web.config" -Recurse | %{
        Write-Host "  -> Changing $($_.FullName)"
         
        # remove the read-only bit on the file
        sp $_.FullName IsReadOnly $false

        # update the azure test database to the default.  This will allow proper e2e testing
        (gc $_.FullName).replace("MpgMeter_AzureTest", "MpgMeter_Test") | sc $_.FullName
    }

    Write-Host "Updating the AzureTest configuration key from MpgMeter_AzureTest to MpgMeter_Test for database tests $pathToSearch"
    gci -Path $pathToSearch -Filter "app.config" -Recurse | %{
        Write-Host "  -> Changing $($_.FullName)"
         
        # remove the read-only bit on the file
        sp $_.FullName IsReadOnly $false

        # update the azure test database to the default.  This will allow proper e2e testing
        (gc $_.FullName).replace("MpgMeter_AzureTest", "MpgMeter_Test") | sc $_.FullName
    }
 
    Write-Host "Done!"
}
catch {
    Write-Host $_
    exit 1
}

Param (
    [Parameter(Mandatory = $True)]
    [ValidateNotNull()]
    [string]$script:env
)

$script:scriptRoot = Split-Path -Parent $PSCommandPath
$script:portalRoot = Join-Path $script:scriptRoot "..\"
$script:slnPath = Join-Path $script:portalRoot "Microsoft_Azure_Mindaro.sln"
$script:extensionRoot = Join-Path $script:portalRoot "Microsoft_Azure_Mindaro"
$script:folderPath = Join-Path $script:extensionRoot "bin\HostingSvc"
$script:uploadExe = Join-Path $script:portalRoot "PortalUpload\bin\Release\PortalUpload.exe"

. (Join-Path $script:scriptRoot (".\config" + "$script:env" + ".ps1"))

Function callUpload {
    Param (
        [Parameter(Mandatory = $True)]
        [ValidateNotNull()]
        [string]$private:scenario,
        [Parameter(Mandatory = $True)]
        [ValidateNotNull()]
        [string]$private:storageString,
        [Parameter(ValueFromRemainingArguments = $True)]
        $private:varArgs
    )
    & "$script:uploadExe" "-scenario" "$private:scenario" "-sastring" "$private:storageString" "-waitFor" "$script:waitForUri" "-prefix" "mindaro" @private:varArgs
}

Function uploadNew {
    Param (
        [Parameter(Mandatory = $True)]
        [ValidateNotNull()]
        [string]$private:storageString,
        [Parameter(ValueFromRemainingArguments = $True)]
        $private:uploadVarArgs
    )
    callUpload "UploadNewVersion" "$private:storageString" "-configs" "$script:configs" "-binpath" "$script:folderPath" @private:uploadVarArgs
}

Function updateActive {
    Param (
        [Parameter(Mandatory = $True)]
        [ValidateNotNull()]
        [string]$private:storageString,
        [Parameter(Mandatory = $True)]
        [ValidateNotNull()]
        [string]$private:version,
        [Parameter(ValueFromRemainingArguments = $True)]
        $private:uploadVarArgs
    )
    callUpload "UpdateActive" "$private:storageString" "-version" "$private:version" @private:uploadVarArgs
}

Function addToOthers {
    Param (
        [Parameter(Mandatory = $True)]
        [ValidateNotNull()]
        [string]$private:storageString,
        [Parameter(Mandatory = $True)]
        [ValidateNotNull()]
        [string]$private:version,
        [Parameter(ValueFromRemainingArguments = $True)]
        $private:uploadVarArgs
    )
    callUpload "AddToOtherVersions" "$private:storageString" "-version" "$private:version" @private:uploadVarArgs
}

Function removeFromOthers {
    Param (
        [Parameter(Mandatory = $True)]
        [ValidateNotNull()]
        [string]$private:storageString,
        [Parameter(Mandatory = $True)]
        [ValidateNotNull()]
        [string]$private:version,
        [Parameter(ValueFromRemainingArguments = $True)]
        $private:uploadVarArgs
    )
    callUpload "RemoveOther" "$private:storageString" "-version" "$private:version" @private:uploadVarArgs
}

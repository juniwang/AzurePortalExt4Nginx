﻿Param (
    [Parameter(Mandatory = $True)]
    [ValidateNotNull()]
    [string]$private:sa,
    [Parameter(Mandatory = $True)]
    [ValidateNotNull()]
    [string]$private:version,
    [Parameter(ValueFromRemainingArguments = $True)]
    $private:varArgs
)

. (Join-Path (Split-Path -Parent $PSCommandPath) ".\setVariables.ps1") "Prod"

updateActive "$private:sa" "$private:version" @private:varArgs
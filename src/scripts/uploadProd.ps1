Param (
    [Parameter(Mandatory = $True)]
    [ValidateNotNull()]
    [string]$private:sa,
    [Parameter(ValueFromRemainingArguments = $True)]
    $private:varArgs
)

. (Join-Path (Split-Path -Parent $PSCommandPath) ".\setVariables.ps1") "Prod"

uploadNew "$private:sa" @private:varArgs
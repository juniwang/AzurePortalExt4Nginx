Param (
    [Parameter(Mandatory = $True)]
    [ValidateNotNull()]
    [string]$private:sa,
    [Parameter(ValueFromRemainingArguments = $True)]
    $private:varArgs
)

. (Join-Path (Split-Path -Parent $PSCommandPath) ".\setVariables.ps1") "DF"

uploadNew "$private:sa" "-overwrite" @private:varArgs
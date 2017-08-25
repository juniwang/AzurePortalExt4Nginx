Param (
    [Parameter(Mandatory = $True)]
    [ValidateNotNull()]
    $script:sa
)

. (Join-Path (Split-Path -Parent $PSCommandPath) ".\setVariables.ps1")

& (Join-Path $script:scriptRoot "build.ps1") /p:Configuration=Release "/t:Clean;Rebuild"
if ($?) {
    & (Join-Path $script:scriptRoot "uploadProd.ps1") $script:sa
}

. (Join-Path (Split-Path -Parent $PSCommandPath) ".\setVariables.ps1")

Msbuild $script:slnPath $args
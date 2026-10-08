# Apache on port 8888 forwards requests to this local PHP server.
$phpExecutable = 'C:\MAMP\bin\php\php8.2.14\php.exe'
$phpConfiguration = 'C:\MAMP\conf\headless-php8.2.14\php.ini'
& $phpExecutable -c $phpConfiguration -S localhost:8001 -t $PSScriptRoot

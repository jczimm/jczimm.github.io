@echo off
echo.

set NodePackagesPath=C:\Program Files\nodejs\node_modules\npm

set Path=%NodePackagesPath%\node_modules\bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=production

echo Environment variables are successfully added.
echo. 
echo Running on port 8888.
echo.

node socket.js
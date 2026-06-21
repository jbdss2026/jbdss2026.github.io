@echo off
set "PYTHON=C:\Users\A\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
set "SITE_DIR=%~dp0dist"
start "shangruo-portfolio-static" /min "%PYTHON%" -m http.server 8088 --bind 127.0.0.1 -d "%SITE_DIR%"
timeout /t 2 >nul
start "" "http://127.0.0.1:8088/"

@echo off
cd /d "%~dp0"
start "shangruo-portfolio-dev" cmd /k "%~dp0start-dev.bat"
timeout /t 3 >nul
start "" "http://127.0.0.1:5173/"

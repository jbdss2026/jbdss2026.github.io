@echo off
set "NODE=C:\Users\A\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
set "PATH=C:\Users\A\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
cd /d "%~dp0"
"%NODE%" "node_modules\vite\bin\vite.js" --host 127.0.0.1

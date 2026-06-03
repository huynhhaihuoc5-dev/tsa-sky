@echo off
echo ===================================
echo SKY EDU - Local Server
echo ===================================
echo.
echo Starting local server...
echo Open browser: http://localhost:8000
echo.
echo Press Ctrl+C to stop server
echo ===================================
echo.

cd /d "%~dp0"
python -m http.server 8000

pause

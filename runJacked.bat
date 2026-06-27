@echo off
:: Change to the directory where this bat file is located
cd /d "%~dp0"

:: Run Flask backend in a new window
:: Assumes Flask is in a subfolder named 'backend'
start "Flask Backend" cmd /k "cd backend && python -m flask run"

:: Wait briefly to ensure the first window opens (optional, helps with window focus)
timeout /t 2 /nobreak > nul

:: Run React frontend in a new window
:: Assumes React is in a subfolder named 'frontend'
start "React Frontend" cmd /k "cd frontend && npm start"
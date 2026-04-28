@echo off
echo Starting Church Website Backend...
echo Checking for Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python not found. Please install Python to run the backend.
    pause
    exit /b
)

echo Checking dependencies...
pip install flask flask-sqlalchemy flask-cors >nul 2>&1

echo Starting Server on http://localhost:5000...
python app.py
pause

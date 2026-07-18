@echo off
rem Doppelklickbarer Starter fuer Windows (offline).
rem Verkleinert alle PDFs in DEM Ordner, in dem diese Datei liegt.
rem
rem So nutzt du es am einfachsten:
rem   1. Diese Datei UND pdf_verkleinern.py in den Ordner mit deinen PDFs
rem      kopieren (z. B. raw\).
rem   2. Doppelklick auf "PDF_verkleinern.bat".
rem
rem Ergebnis: verkleinerte Kopien im Unterordner "verkleinert\".
setlocal
cd /d "%~dp0"

rem --- Python-Launcher finden (py bevorzugt, sonst python) ---
set "PY="
where py >nul 2>nul && set "PY=py"
if not defined PY ( where python >nul 2>nul && set "PY=python" )
if not defined PY (
  echo python nicht gefunden.
  echo Installiere Python 3 von https://www.python.org/downloads/
  echo WICHTIG: beim Setup "Add python.exe to PATH" anhaken.
  echo.
  pause
  exit /b 1
)

rem --- Skript neben mir oder in tools\ suchen ---
set "SCRIPT="
if exist "pdf_verkleinern.py" set "SCRIPT=pdf_verkleinern.py"
if not defined SCRIPT if exist "tools\pdf_verkleinern.py" set "SCRIPT=tools\pdf_verkleinern.py"
if not defined SCRIPT (
  echo pdf_verkleinern.py nicht gefunden.
  echo Lege es in denselben Ordner wie diese Datei.
  echo.
  pause
  exit /b 1
)

echo Verkleinere PDFs in: %CD%
echo.
%PY% "%SCRIPT%" .
echo.
pause

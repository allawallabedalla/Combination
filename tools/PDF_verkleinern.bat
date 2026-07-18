@echo off
rem Doppelklickbarer Starter fuer Windows.
rem Verkleinert alle PDFs in DEM Ordner, in dem diese Datei liegt.
rem Fehlt ein PDF-Motor, bietet die Datei an, PyMuPDF automatisch zu installieren.
rem
rem So nutzt du es am einfachsten:
rem   1. Diese Datei UND pdf_verkleinern.py in den Ordner mit deinen PDFs
rem      kopieren (z. B. raw\).
rem   2. Doppelklick auf "PDF_verkleinern.bat".
rem
rem Ergebnis: verkleinerte Kopien im Unterordner "verkleinert\".
setlocal enabledelayedexpansion
cd /d "%~dp0"

rem --- Python-Launcher finden (py bevorzugt, sonst python) ---
set "PY="
where py >nul 2>nul && set "PY=py"
if not defined PY ( where python >nul 2>nul && set "PY=python" )
if not defined PY goto :nopython

rem --- Skript neben mir oder in tools\ suchen ---
set "SCRIPT="
if exist "pdf_verkleinern.py" set "SCRIPT=pdf_verkleinern.py"
if not defined SCRIPT if exist "tools\pdf_verkleinern.py" set "SCRIPT=tools\pdf_verkleinern.py"
if not defined SCRIPT goto :noscript

rem --- PDF-Motor pruefen (Ghostscript oder PyMuPDF) ---
call :check_engine
if defined ENGINE goto :run

echo Kein PDF-Motor gefunden (Ghostscript oder PyMuPDF).
echo Ohne einen davon koennen PDFs nicht verkleinert werden.
echo.
set "ANS="
set /p "ANS=Jetzt PyMuPDF automatisch installieren? (j/n): "
if /i "!ANS!"=="j"  goto :install
if /i "!ANS!"=="ja" goto :install
echo.
echo Abgebrochen. Alternativen:
echo   - PyMuPDF spaeter:  %PY% -m pip install pymupdf
echo   - Ghostscript:      winget install ArtifexSoftware.GhostScript
echo.
pause
exit /b 1

:install
echo.
echo Installiere PyMuPDF (einmalig, braucht Internet)...
%PY% -m pip install pymupdf
call :check_engine
if defined ENGINE goto :run
echo.
echo Installation hat nicht geklappt. Pruefe die Internetverbindung, oder
echo installiere Ghostscript:  winget install ArtifexSoftware.GhostScript
echo.
pause
exit /b 1

:run
echo.
echo Verkleinere PDFs in: %CD%
echo.
%PY% "%SCRIPT%" .
echo.
pause
exit /b 0

rem === Unterroutine: setzt ENGINE, wenn ein PDF-Motor da ist ===
:check_engine
set "ENGINE="
where gswin64c >nul 2>nul && set "ENGINE=gs"
if not defined ENGINE where gswin32c >nul 2>nul && set "ENGINE=gs"
if not defined ENGINE where gs >nul 2>nul && set "ENGINE=gs"
if not defined ENGINE ( %PY% -c "import fitz" >nul 2>nul && set "ENGINE=fitz" )
exit /b 0

:nopython
echo python nicht gefunden.
echo Installiere Python 3 von https://www.python.org/downloads/
echo WICHTIG: beim Setup "Add python.exe to PATH" anhaken.
echo.
pause
exit /b 1

:noscript
echo pdf_verkleinern.py nicht gefunden.
echo Lege es in denselben Ordner wie diese Datei.
echo.
pause
exit /b 1

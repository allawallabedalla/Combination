#!/bin/bash
# Doppelklickbarer Starter für macOS (offline).
# Verkleinert alle PDFs in DEM Ordner, in dem diese Datei liegt.
#
# So nutzt du es am einfachsten:
#   1. Diese Datei UND pdf_verkleinern.py in den Ordner mit deinen PDFs kopieren
#      (z. B. raw/).
#   2. Doppelklick auf "PDF_verkleinern.command".
#   (Beim ersten Mal ggf. Rechtsklick → "Öffnen", um Gatekeeper zu bestätigen.)
#
# Ergebnis: verkleinerte Kopien im Unterordner "verkleinert/".
set -e
cd "$(dirname "$0")"

# Skript neben mir suchen, sonst im Repo unter tools/
if [ -f "pdf_verkleinern.py" ]; then
  SCRIPT="pdf_verkleinern.py"
elif [ -f "tools/pdf_verkleinern.py" ]; then
  SCRIPT="tools/pdf_verkleinern.py"
else
  # aufwärts nach tools/pdf_verkleinern.py suchen
  d="$PWD"
  while [ "$d" != "/" ]; do
    if [ -f "$d/tools/pdf_verkleinern.py" ]; then SCRIPT="$d/tools/pdf_verkleinern.py"; break; fi
    d="$(dirname "$d")"
  done
fi

if [ -z "${SCRIPT:-}" ]; then
  echo "pdf_verkleinern.py nicht gefunden. Lege es in denselben Ordner wie diese Datei."
  read -r -p "Enter zum Schließen…" _; exit 1
fi

PY="$(command -v python3 || true)"
if [ -z "$PY" ]; then
  echo "python3 nicht gefunden. Installiere Python 3 (python.org) oder: brew install python"
  read -r -p "Enter zum Schließen…" _; exit 1
fi

# PDF-Motor prüfen; fehlt er, Auto-Install von PyMuPDF anbieten
have_engine() { command -v gs >/dev/null 2>&1 || "$PY" -c "import fitz" >/dev/null 2>&1; }
if ! have_engine; then
  echo "Kein PDF-Motor gefunden (Ghostscript oder PyMuPDF)."
  read -r -p "Jetzt PyMuPDF automatisch installieren? (j/n): " ans
  case "$ans" in
    j|J|ja|Ja|JA)
      echo "Installiere PyMuPDF (einmalig, braucht Internet)…"
      "$PY" -m pip install pymupdf ;;
    *)
      echo "Abgebrochen. Alternativ: brew install ghostscript"
      read -r -p "Enter zum Schließen…" _; exit 1 ;;
  esac
  if ! have_engine; then
    echo "Installation hat nicht geklappt. Alternativ: brew install ghostscript"
    read -r -p "Enter zum Schließen…" _; exit 1
  fi
fi

echo "Verkleinere PDFs in: $PWD"
"$PY" "$SCRIPT" .
echo
read -r -p "Fertig. Enter zum Schließen…" _

=== Bino EduTour Website — Local Setup ===

IMPORTANT: You must start a local server from INSIDE this folder.

OPTION 1 — Mac double-click:
  Double-click "启动服务器.command"
  Then open: http://localhost:8080

OPTION 2 — Terminal:
  cd path/to/site2
  python3 -m http.server 8080
  Then open: http://localhost:8080

OPTION 3 — Upload to Netlify (recommended):
  Drag the entire site2 folder to netlify.com/drop
  Done. No server needed.

FOLDER STRUCTURE:
  index.html     ← Main registration page
  confirm.html   ← Payment instructions page
  css/style.css  ← All styles
  js/main.js     ← Main page JS
  js/confirm.js  ← Confirm page JS
  assets/        ← Images + video

Google Apps Script URL is already embedded in js/main.js

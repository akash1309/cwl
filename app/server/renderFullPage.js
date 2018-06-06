export default function renderFullPage(html) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>CWL Railways</title>
      </head>
      <body style="height: 100%">
        <div id="root" style="height: 100%">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `
}

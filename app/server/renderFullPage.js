export default function renderFullPage(html) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>CWL Railways</title>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body style="height: 100%">
        <div id="root" style="height: 100%">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `
}

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderFullPage;
function renderFullPage(html) {
  return "\n    <!doctype html>\n    <html>\n      <head>\n        <title>CWL Railways</title>\n        <link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" rel=\"stylesheet\">\n      </head>\n      <body style=\"height: 100%\">\n        <div id=\"root\" style=\"height: 100%\">" + html + "</div>\n        <script src=\"/bundle.js\"></script>\n      </body>\n    </html>\n  ";
}
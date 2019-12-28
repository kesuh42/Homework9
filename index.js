var fs = require("fs")
var pdf = require('html-pdf');

var templateHTML = `
<!DOCTYPE html>
    <html>
        <head>
            <title>Developer Profile Generator</title>
        </head>

        <body>
            <header>Potato</header>
        </body>
    </html>
`

pdf.create(templateHTML).toFile('index.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
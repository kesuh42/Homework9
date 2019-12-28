var fs = require("fs")
var pdf = require('html-pdf');
var axios = require("axios")
var inquirer = require("inquirer")

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

inquirer.prompt([
    {
        type: "input",
        name: "github",
        message: "What is your github url?"
    },
    {
        type: "rawlist",
        name: "color",
        message: "What is your favorite color?",
        choices: ["red", "blue", "yellow", "green", "purple", "orange", "pink"]
    }
]).then(function(data){
    axios.get(`https://api.github.com/users/${data.github}`).then(function(data){
        console.log(data)
    })
    
})

pdf.create(templateHTML).toFile('index.pdf', function(err, res) {
    if (err) return console.log(err);
  });
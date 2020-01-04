var fs = require("fs")
var pdf = require('html-pdf');
var axios = require("axios")
var inquirer = require("inquirer")

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
        var starsVar = "${data.length}"
        var templateHTML = `
        <!DOCTYPE html>
            <html>
                <head>
                    <title>Developer Profile Generator</title>
                    <link rel="stylesheet" type="text/css" href="style.css">
                </head>

                <body>
                    <div class="card">
                        <img src="https://avatars3.githubusercontent.com/u/55920932?v=4" alt="Avatar">
                        <div class="container">
                        <div><b>Hi!</b></div>
                        <div><b>My name is ${data.login}</b></div>
                        <div>{data.bio}</div>
                        <a href="https://www.google.com/maps/place/${data.location}">Location</a> <a href="https://github.com/${data.login}">Github</a> <a href="#">Blog?</a>
                        </div>
                    </div>
                    
                    <div class="card2">
                        <div class="container">
                            <div><b>Public Repositories: ${data.public_repos}</b></div>
                        </div>
                    </div>

                    <div class="card2">
                        <div class="container">
                            <div><b>Followers: ${data.followers}</b></div>
                        </div>
                    </div>

                    <div class="card2">
                        <div class="container">
                        <div><b>Github Stars: 0</b></div>
                    </div>
                    </div>

                    <div class="card2">
                        <div class="container">
                            <div><b>Following: ${data.following}</b></div>
                    </div>
                    </div>
                </body>
            </html>
        `
        var templateCSS = `
        body {
            background-color: grey;
          }
          
          img {
            display: block;
            width: 200px;
            height: 200px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .card {
              box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
              transition: 0.3s;
              border-radius: 5px;
              width: calc(100%-40px);
              background-color: pink;
              text-align: center;
              font-size: 32px;
              padding: 20px;
              margin: 20px;
            }
          
            .card:hover {
              box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            }
            
            .container {
              padding: 2px 16px;
            }
          
          .card2 {
              box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
              transition: 0.3s;
              border-radius: 5px;
              width: 50%;
              background-color: pink;
              text-align: center;
              font-size: 32px;
              padding: 20px;
              margin: auto;
              margin-top: 20px;
            }
          
            .card:hover {
              box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            }
            
            .container {
              padding: 2px 16px;
            }`

            fs.writeFile("index.html", templateHTML, function(err){
                if (err) {
                    throw err
                }
            })
            fs.writeFile("style.css", templateCSS, function(err){
                if (err) {
                    throw err
                }
            })
    })
})

pdf.create(index.html).toFile('index.pdf', function(err, res) {
    if (err) return console.log(err);
  });
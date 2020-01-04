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
]).then(function(inquiry){
    axios.get(`https://api.github.com/users/${inquiry.github}`).then(function(axiosCall){
        console.log(inquiry)
        var templateHTML = `
        <!DOCTYPE html>
            <html>
                <head>
                    <title>Developer Profile Generator</title>
                    <link rel="stylesheet" type="text/css" href="style.css">
                    <style>
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
                          background-color: ${inquiry.color};
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
                          background-color: ${inquiry.color};
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
                        }
                    </style>
                </head>

                <body>
                    <div class="card">
                        <img src="${axiosCall.data.avatar_url}" alt="Avatar">
                        <div class="container">
                        <div><b>Hi!</b></div>
                        <div><b>My name is ${axiosCall.data.login}</b></div>
                        <div>${axiosCall.data.bio}</div>
                        <a href="https://www.google.com/maps/place/${axiosCall.data.location}">Location</a> <a href="https://github.com/${axiosCall.data.login}">Github</a> <a href="#">Blog?</a>
                        </div>
                    </div>
                    
                    <div class="card2">
                        <div class="container">
                            <div><b>Public Repositories: ${axiosCall.data.public_repos}</b></div>
                        </div>
                    </div>

                    <div class="card2">
                        <div class="container">
                            <div><b>Followers: ${axiosCall.data.followers}</b></div>
                        </div>
                    </div>

                    <div class="card2">
                        <div class="container">
                        <div><b>Github Stars: 0</b></div>
                    </div>
                    </div>

                    <div class="card2">
                        <div class="container">
                            <div><b>Following: ${axiosCall.data.following}</b></div>
                    </div>
                    </div>
                </body>
            </html>
        `

            fs.writeFile("index.html", templateHTML, function(err){
                if (err) {
                    throw err
                }
                else {
                    {
                        var html = fs.readFileSync('./index.html', 'utf8')
                        pdf.create(html).toFile("./index.pdf", function(err, res) {
                            console.log(res);
                        })
                    }
                }
            })

    })
})
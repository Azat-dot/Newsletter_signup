//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res){

    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data)

    const url = "https://us8.api.mailchimp.com/3.0/lists/ac3688b049"

    const options = {
        method: "POST",
        auth: "azat1:4541dd4d1254e6f6d7768b07a8cddf4e-us8"
    }

   const request = https.request(url, options, function(response){

    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
    }) 

    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server is running in port 3000");
});




// aud ID

// ac3688b049


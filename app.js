const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.get('/', function(req, res){
    res.send("Server is runing well")
})


app.listen(3000, function(){
    console.log("Server is running in host 3000");
})
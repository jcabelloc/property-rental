var express = require("express");
var app = express();

app.get("/", function(req, res){
    //res.send("Home page will be here");
    res.render("home.ejs");
});

app.listen(3000, function(req, res){
    console.log("Server Started");
});
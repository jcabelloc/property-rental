var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/propertyDB');

const propertySchema = new mongoose.Schema({
    price: Number,
    url: String,
    address: String,
    description: String
});
var Property = mongoose.model("Property", propertySchema);

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    Property.find({}, function(err, properties){
        if (err){
            console.log("ERROR!!!");
        } else {
            res.render("home", {properties: properties});
        }
    })
});

app.get("/properties/new", function(req, res){
    res.render("properties/new");
});

app.post("/properties", function(req, res){
    console.log("Property from the view: " + JSON.stringify(req.body.property));
    Property.create(req.body.property, function(err, createdProperty){
        if(err){
            console.log(err);
        } else {
            console.log("Property created: " + createdProperty);
            res.redirect("/");
        }
    })

});

app.get("/test", function(req, res){
    res.render("test", {properties: properties});
});

app.listen(3000, function(req, res){
    console.log("Server Started");
});
var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var properties = [
    {
        price: "550",
        url: "https://myupdatestudio.com/wp-content/uploads/2018/01/3-BHKvilla-copy.jpg",
        address: "4051 Southern Trace Dr, College Station, TX 77845",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ante leo. Vestibulum ac ullamcorper urna. Duis tempus auctor risus, sed viverra sapien gravida et. Cras hendrerit iaculis sapien, ac volutpat purus egestas gravida"
    },
    {
        price: "550",
        url: "http://chennaibestproperties.com/wp-content/uploads/2015/06/about_us.jpg",
        address: "4051 Southern Trace Dr, College Station, TX 77845",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ante leo. Vestibulum ac ullamcorper urna. Duis tempus auctor risus, sed viverra sapien gravida et. Cras hendrerit iaculis sapien, ac volutpat purus egestas gravida"
    },
    {
        price: "550",
        url: "http://roitoledo.com/public/uploads/sites/2017_11_28_02_03_40_1__3property-sale-2.jpg",
        address: "4051 Southern Trace Dr, College Station, TX 77845",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ante leo. Vestibulum ac ullamcorper urna. Duis tempus auctor risus, sed viverra sapien gravida et. Cras hendrerit iaculis sapien, ac volutpat purus egestas gravida"
    },
    {
        price: "550",
        url: "https://myupdatestudio.com/wp-content/uploads/2018/01/clubhousewelcome2i-min.jpg",
        address: "4051 Southern Trace Dr, College Station, TX 77845",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ante leo. Vestibulum ac ullamcorper urna. Duis tempus auctor risus, sed viverra sapien gravida et. Cras hendrerit iaculis sapien, ac volutpat purus egestas gravida"
    }
];


app.get("/", function(req, res){
    res.render("home", {properties: properties});
});

app.get("/properties/new", function(req, res){
    res.render("properties/new");
});

app.post("/properties", function(req, res){
    console.log(req.body.property);
    properties.push(req.body.property);
    res.redirect("/");
});

app.get("/test", function(req, res){
    res.render("test", {properties: properties});
});

app.listen(3000, function(req, res){
    console.log("Server Started");
});
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/propertyDB');

const questionSchema = new mongoose.Schema({
    question: String,
    answer: String
});

var Question = mongoose.model("Question", questionSchema);

const propertySchema = new mongoose.Schema({
    price: Number,
    url: String,
    address: String,
    description: String,
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ]
});

var Property = mongoose.model("Property", propertySchema);

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/properties", function(req, res){
    Property.find({}, function(err, properties){
        if (err){
            console.log("ERROR!!!");
        } else {
            res.render("properties/index", {properties: properties});
        }
    })
});


app.get("/properties/new", function(req, res){
    res.render("properties/new");
});

app.get("/properties/:id", function(req, res){
   Property.findById(req.params.id).populate("questions").exec(function(err, foundProperty){
        if (err) {
            console.log("Error finding property");
        } else{
            res.render("properties/show", {property: foundProperty});
        }
   })
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

app.get("/properties/:id/questions/new", function(req, res){
    res.render("questions/new", {id: req.params.id});
});

app.post("/properties/:id/questions", function(req, res){
    console.log(req.body.question);
    Question.create(req.body.question, function (err, createdQuestion){
        if (err){
            console.log("ERROR saving question");
        } else {
            Property.findById(req.params.id, function(err, foundProperty){
                if(err){
                    console.log("ERROR finding property when saving question");
                } else {
                    foundProperty.questions.push(createdQuestion);
                    foundProperty.save(function(err, updatedProperty){
                        if(err){
                            console.log("ERROR updating property with new question");
                        } else{
                            console.log(updatedProperty);
                            res.redirect("/properties/" + foundProperty._id);
                        }
                    });
                }
            })
        }
    });
});



app.listen(3000, function(req, res){
    console.log("Server Started");
});
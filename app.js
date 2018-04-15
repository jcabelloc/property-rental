var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var Property = require("./models/property");
var Question = require("./models/question");

mongoose.connect('mongodb://localhost/propertyDB');


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(methodOverride("_method"));


app.get("/", function(req, res){
    res.render("home");
});

// Property ROUTES
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

app.get("/properties/:id/edit", function(req, res){
    Property.findById(req.params.id, function(err, foundProperty){
        if (err){
            console.log("Error finding property to edit");
        } else {
            res.render("properties/edit", {property: foundProperty});
        }
    });
});

app.put("/properties/:id", function(req, res){
    Property.findByIdAndUpdate(req.params.id, req.body.property, function(err, updatedProperty){
        if(err){
            console.log("ERROR updating property");
        } else {
            res.redirect("/properties/" + updatedProperty.id);
        }
    })
    console.log(req.body.property);
});

app.delete("/properties/:id", function(req, res){
    Property.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("Error deleting property");
        } else {
            res.redirect("/properties");
        }
    });
});

// Question ROUTES
app.get("/properties/:id/questions/new", function(req, res){
    res.render("questions/new", {id: req.params.id});
});


app.post("/properties/:id/questions", function(req, res){
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

app.get("/properties/:id/questions/:questionId/edit", function(req, res){
    Question.findById(req.params.questionId, function(err, foundQuestion){
        if(err){
            console.log("Error finding question");
        } else {
            res.render("questions/edit", {propertyId: req.params.id, question: foundQuestion});
        }
    })
});

app.put("/properties/:id/questions/:questionId", function(req, res){
    Question.findByIdAndUpdate(req.params.questionId, req.body.question, function(err, updatedQuestion){
        if(err){
            console.log("Error Updating Question");
        } else {
            res.redirect("/properties/" + req.params.id);
        }
    })
});

app.delete("/properties/:id/questions/:questionId", function(req, res){
    Question.findByIdAndRemove(req.params.questionId, function(err){
        if(err){
            console.log("error deleting question");
        } else {
            res.redirect("/properties/" + req.params.id);
        }
    });
})

app.listen(3000, function(req, res){
    console.log("Server Started");
});
// #YelpCamp V1
// Add landing page
// Add campgrounds page that lists all campgrounds

// Each campgrounds has:
// - name
// - image

// Layout and basic styling
// **  Create out header & footer part
// **  Add in Bootstrap


var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyparser.urlencoded({extended:true}));
app.set("View engine", "ejs");

var campgrounds = [
    {name:"Salmon creek", image:"https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
    {name:"Granite Hill", image:"https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
    {name:"Mountain Goat's rest", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f712f7cd29f48cc_340.jpg"},
    {name:"Salmon creek", image:"https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
    {name:"Granite Hill", image:"https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
    {name:"Mountain Goat's rest", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f712f7cd29f48cc_340.jpg"},
    {name:"Salmon creek", image:"https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
    {name:"Granite Hill", image:"https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
    {name:"Mountain Goat's rest", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f712f7cd29f48cc_340.jpg"}
];

app.get("/", function(req,res){
    //res.send("This will be Landing page Soon..!! ");
    res.render("landing.ejs");
});

app.get("/campgrounds", function(req,res){
    res.render("campgrounds.ejs",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){
    //res.send("You hit POST Route!! ");

    //Get data from form and add to campgrounds array..
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image}
    campgrounds.push(newCampground);

    //redirect back to campgrounds page..
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});


app.listen(3000, process.env.IP, function(){
    console.log("The YelpCamp server has runinng!!!");
});
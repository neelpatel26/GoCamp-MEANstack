var express     = require("express"),
    app         = express(),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp",  { useNewUrlParser: true } );
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");



//SETUP SCHEMA
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    location: String
});



// //Compile that into a model..
var campground = mongoose.model("campgrounds", campgroundSchema);

// campground.create(
//     {
//         name:"Granite Hill",
//         image:"https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg",
//         location: "Yellow Stone National Park"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("New created campground!!");
//             console.log(campground);
//         }
//     });
    
// var campgrounds = [
//     {name:"Salmon creek", image:"https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
//     {name:"Granite Hill", image:"https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
//     {name:"Mountain Goat's rest", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f712f7cd29f48cc_340.jpg"},
//     {name:"Salmon creek", image:"https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
//     {name:"Granite Hill", image:"https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
//     {name:"Mountain Goat's rest", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f712f7cd29f48cc_340.jpg"},
//     {name:"Salmon creek", image:"https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
//     {name:"Granite Hill", image:"https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732b7bd09f45c251_340.jpg"},
//     {name:"Mountain Goat's rest", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f712f7cd29f48cc_340.jpg"}
// ];

app.get("/", function(req,res){
    //res.send("This will be Landing page Soon..!! ");
    res.render("landing.ejs");
});

//INDEX - Show all campgrounds..
app.get("/campgrounds", function(req,res){
    //get all campgrounds from DB..
    campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds:allCampgrounds});
        }
    });

    // res.render("campgrounds.ejs",{campgrounds:campgrounds});
});
app.post("/campgrounds", function(req,res){
    //res.send("You hit POST Route!! ");

    //Get data from form and add to campgrounds array..
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc}
    //create new campground and save to DB..
    campground.create(newCampground, function(err,newlyCreatd){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page..
            res.redirect("/campgrounds");
        }
    });
    //campgrounds.push(newCampground);
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

//SHOW - shows more details about one campground..
app.get("/campgrounds/:id", function(req,res){
    // find campground with provided Id..
    campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        } else{
            // render show template with that campground..
            res.render("show",{campground:foundCampground});
        }
    });
});

app.listen(3000, process.env.IP, function(){
    console.log("The YelpCamp server has runinng!!!");
});
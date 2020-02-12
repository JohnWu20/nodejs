var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Salmon Creek",
// 		image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020__480.jpg",
// 		description:"This is a very beatiful camp place where you can see beatiful landscape"
// 	},
// 	function(err, campground){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log("Newly Created Campground: ");
// 		console.log(campground);
// 	}
// });

var campgrounds = [
		{name: "Slamon Creek", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020__480.jpg"},
		{name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__480.jpg"},
		{name: "Mountain", image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__480.jpg"},
		{name: "Slamon Creek", image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__480.jpg"}
]

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){	
	//get all campgrounds from db
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{campgrounds : allCampgrounds});
		}
	});
	
});

// get data from form and add to campgrounds array
// redirect back to campgrounds page
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//create a new campground and save it to the database
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
	// res.redirect("/campgrounds");
});

//show the form and send the data
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

//show new id:
app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("show",{campground: foundCampground});
		}
	});
});


app.listen(9000, process.env.IP, function(){
	console.log("The YelpCamp Server");
});


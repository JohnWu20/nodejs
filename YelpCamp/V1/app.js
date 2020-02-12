var express = require("express");
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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
	res.render("campgrounds",{campgrounds : campgrounds});
});

// get data from form and add to campgrounds array
// redirect back to campgrounds page
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

//show the form and send the data
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});
app.listen(9000, process.env.IP, function(){
	console.log("The YelpCamp Server");
});

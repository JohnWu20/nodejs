var express    = require("express"),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	app        = express();
	methodOverride = require("method-override");
var save = require('summernote-nodejs');
mongoose.connect("mongodb://localhost/notebook", {useNewUrlParser: true});
app.set("view engin", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
var blogSchema = new mongoose.Schema({
	title: String,
	// image: String,
	// body: String,
	// content: String,
	created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
// 	title:"Test Blog",
// 	content:"https://image.shutterstock.com/image-photo/camp-forest-adventure-travel-remote-260nw-443840548.jpg",
// },
// 	function(err, blog){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			console.log("Newly Created Campground: ");
// 			console.log(blog);
// 		}
// 	}
// );

app.get("/community", function(req,res){
	res.render("community.ejs");
});

app.get("/home", function(req,res){
	res.render("home.ejs");
});

app.get("/about", function(req,res){
	res.render("about.ejs");
});


app.get("/edit", function(req,res){
	res.render("edit.ejs");
});

app.get("/login", function(req,res){
	res.render("login.ejs");
});

app.get("/example", function(req,res){
	res.render("example.ejs");
});

app.get("/public", function(req,res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("ERROR!!");
		}
		else{
			res.render("public.ejs", {blogs: blogs});
		}
	});
});

app.post("/public", function(req, res){
	var title = req.body.title;
	var date = req.body.created;
	var content = req.body.content;
	var newBlog = {title: title, date: date, content: content};
	//create a new campground and save it to the database
	Blog.create(newBlog, function(err, newlyCreated){
		if(err){
			res.render("/edit");
		}
		else{
			res.redirect("/public");
		}
	});
});


app.get("/public/:id", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/public");
		}
		else{
			res.render("portfolio-example01.ejs", {blog:foundBlog});
		}
	});
});

app.put("/public/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/public");
		}
		else{
			res.redirect("/public/" + req.params.id);
		}
	});
});

app.delete("/public/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/public");
		}
		else{
			res.redirect("/public");
		}
	});
});

app.get("/contact", function(req,res){
	res.render("contact.ejs");
});

app.get("/signup", function(req,res){
	res.render("signup.ejs");
});

app.get("/portfolio-example01", function(req,res){
	res.render("portfolio-example01.ejs");
});


app.get("/", function(req,res){
	res.redirect("/home");

});
app.listen(9000, process.env.IP, function(){
	console.log("SEVER IS RUNNING");
});
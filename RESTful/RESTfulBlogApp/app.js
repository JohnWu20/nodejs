var express    = require("express"),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	app        = express(),
	methodOverride = require("method-override");
mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
app.set("view engin", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
// 	title:"Test Blog",
// 	image:"https://image.shutterstock.com/image-photo/camp-forest-adventure-travel-remote-260nw-443840548.jpg",
// 	body:"This is a new blog descrption"
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
//RESFUL ROUTES

app.get("/blogs", function(req,res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("ERROR!!");
		}
		else{
			res.render("index.ejs", {blogs: blogs});
		}
	});
});

app.get("/blogs/new", function(req,res){
	res.render("new.ejs");
});

app.post("/blogs", function(req,res){
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new.ejs");
		}
		else{
			res.redirect("/blogs");
		}
	});
});


app.get("/", function(req,res){
	res.redirect("/blogs");

});

app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("show.ejs", {blog:foundBlog});
		}
	});
});

app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("edit.ejs", {blog:foundBlog});
		}
	});
});

app.put("/blogs/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//delete route
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs");
		}
	});
});



app.listen(9000, process.env.IP, function(){
	console.log("SEVER IS RUNNING");
});
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//post
var postSchema = new mongoose.Schema({
	title:String,
	content:String
});
var Post = mongoose.model("Post", postSchema);

//user email name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts:[postSchema]
});
var User = mongoose.model("User", userSchema);



// var newUser = new User({
// 	email:"Jason@gwu.edu",
// 	name: "Jason"
// });
// newUser.posts.push({
// 	title:"how to be a position",	
// 	content:"Jsust kidding!"
// });

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title:"Reflections on Apples",
// 	content:"They are delecious"
// });

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(post);
// 	}
// });

User.findOne({name:"Jason"}, function(err, user){
	if(err){
		console.log(err);
	}
	else{
		user.posts.push({
			title: "3 things I really hate",
			content:"Voldemort. ABCDEF"
		});
		user.save(function(err, user){
			if(err){
				console.log(err);
			}
			else{
				console.log(user);
			}
		})
	}
});

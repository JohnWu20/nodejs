var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo2");
var Post = require("./models/post.js");
var User = require("./models/user.js");
//user email name


Post.create({
	title:"How to cook burger",
	content:"use meat and bread"
},function(err, post){
	User.findOne({email: "Johnstep@gmail.com"},function(err, foundUser){
		if(err){
			console.log(err);
		}
		else{
			foundUser.posts.push(post);
			foundUser.save(function(err, data){
				if(err){
					console.log(err);
				}
				else{
					console.log(data);
				}
			});
		}
	});
});

// User.create({
// 	email:"Johnstep@gmail.com",
// 	name:"Step"
// });



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

// User.findOne({email:"Johnstep@gmail.com"}).populate("posts").exec(function(err, user){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(user);
// 	}
// });

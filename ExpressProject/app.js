var express = require("express");
var app = express();
app.get("/", function(req, res){
	res.send("hi, there!");
});
app.get("/bey", function(req, res){
	res.send("Good bye");	
});
app.get("/dog", function(req, res){
	console.log("some one made a dog");
	res.send("MEOW!");	
});
app.get("*", function(req, res){
	console.log("Star");
	res.send("You are a star!");	
});

app.listen(9000, function(){
	console.log("Server stated");
});

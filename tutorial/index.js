var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var User = require("./models/user").User;


//This middleware of express set the folder for static files
app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "jade");

//get is for send data to the html
app.get("/", function(req, res){
	res.render("index");
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/users", function(req, res){

	var user = new User({email: req.body.email, 
						password: req.body.password,
						password_confirmation: req.body.password_confirmation
					});
	console.log(user);
	user.save(function(err){
		if(err){
			console.log(String(err));
		}else{
			res.send("Guardamos tus datos");
		}
	});
});

app.listen(8080);

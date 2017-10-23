var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/fotos',{ useMongoClient: true });

var Schema = mongoose.Schema;

// This userSchemaJSON is like a table in mongoDB
var userSchemaJSON = {
	email:String,
	password:String
};

// This class create an object or document in mongoDB
var user_schema = new Schema(userSchemaJSON);

var User = mongoose.model("User", user_schema);

//This middleware of express set the folder for static files
app.use(express.static('public'));

app.use(bodyParser.json);
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
	var user = new User({email: req.body.email, password: req.body.password});
	user.save(function(){
		res.send("Guardamos tus datos");
	});
});

app.listen(8080);
var express = require("express");

var app = express();

app.set("view engine", "jade");

//get is for send data to the html
app.get("/", function(req, res){
	res.render("index", {hola: "Hola mundo", user: "German Gomez"});
});

//Se puede recibir parametros, indicando la expresion regular con dos puntos (:)
app.get("/:nombre", function(req, res){
	var name = req.params.nombre;
	res.render("form", {nombre: name});
});

//post is for get data from a form in html
app.post("/", function(req, res){
	res.render("form");
});

app.listen(8080);
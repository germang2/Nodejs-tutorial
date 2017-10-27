var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/fotos', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


var posibles_valores = ["M", "F"];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, "Formato de correo inválido"];

//The validations should be in the schema with a JSON in front of the attribute
var user_schema = new Schema({
	name: String,
	username: {type: String, required: true, maxlength:[20, "Nombre de usuario muy largo"]},
	last_name: String,
	password: {type: String, minlength: [6, "Contraseña muy corta"]},
	age: {type: Number, min: [5,"La edad debe ser menos a 5"], max: [100,"La edad debe ser menor a 100"]},
	email: {type: String, required: "El correo es obligatorio", match: email_match},
	date_of_birth: Date,
	genero: {type: String, enum: {values: posibles_valores, message: "Opción no válida"} }
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});

user_schema.virtual("full_name").get(function(){
	return this.name + " " + this.last_name;
}).set(function(full_name){
	var words = full_name.split(" ");
	this.name = words[0];
	this.last_name = words[1];
});

//Creation of a model from de shema (user_shema)
var User = mongoose.model("User", user_schema);

module.exports.User = User;
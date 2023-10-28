const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  nomUser: { type: String, required: [true, "veuillez entrez votre nom !"] },
  prenomUser: {
    type: String,
    required: [true, "veuillez entrez votre prenom ! "],
  },
  Username: {
    type: String,
    required: [true, "veuillez entrez votre Username ! "],
    unique: true,
  },
  emailUser: {
    type: String,
    required: [true, "veuillez entrez votre email ! "],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "veuillez entrez votre mot de passe ! "],
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);

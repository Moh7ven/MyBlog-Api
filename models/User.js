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
    unique: "Ce pseudo est déjà utilisé. Veuillez en choisir un autre.",
  },
  emailUser: {
    type: String,
    required: [true, "veuillez entrez votre email ! "],
    unique: "Cet email est déjà utilisé. Veuillez en choisir un autre.",
  },
  password: {
    type: String,
    required: [true, "Veuillez entrez votre mot de passe ! "],
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);

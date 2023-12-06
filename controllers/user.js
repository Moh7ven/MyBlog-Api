const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

//FONCTION POUR S'INCRIRE
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        nomUser: req.body.nomUser,
        prenomUser: req.body.prenomUser,
        Username: req.body.Username.toLowerCase(),
        emailUser: req.body.emailUser,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(200).json({
            message: `Utilisateur ${req.body.nomUser} à été bien enregistré`,
          })
        )
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(500).json({ error }));
};

//FONCTION POUR SE CONNNECTER
exports.login = (req, res, next) => {
  console.log(req.body.emailUser);
  User.findOne({ Username: req.body.Username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//FONCTION POUR RECUPÉRER L'UTILISATEUR CONNECTÉ
exports.getUserConnected = (req, res, next) => {
  User.findOne({ _id: req.auth.userId })
    .then((userConnected) => res.status(200).json(userConnected))
    .catch((error) => res.status(400).json({ error }));
};

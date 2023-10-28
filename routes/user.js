const express = require("express");
const upload = require("multer")();

const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

//ROUTE POUR S'INCRIRE
router.post("/signup", upload.any(), userCtrl.signup);

//ROUTE POUR SE CONNECTER
router.post("/login", upload.any(), userCtrl.login);

//ROUTE POUR RECUPÉRER LES INFORMATIONS DE L'UTILISATEUR CONNNECTER
router.get("/userinfos", auth, userCtrl.getUserConnected);

module.exports = router;

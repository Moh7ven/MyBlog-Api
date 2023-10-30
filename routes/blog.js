const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");

const auth = require("../middleware/auth");

const blogCtrl = require("../controllers/blog");

//ROUTE POUR CREER UN BLOG
router.post("/", auth, multer, blogCtrl.createBlog);

//ROUTE POUR RECUPÉRER TOUS LES BLOGS AJOUTÉS PAR LES UTILISATEURS
router.get("/", auth, multer, blogCtrl.getAllBlogs);

//ROUTE POUR RECUPÉRER LES BLOGS AJOUTÉS PAR UN UTILISATEUR
router.get("/userblog", auth, multer, blogCtrl.getUserBlogs);

//ROUTE POUR RECUPÉRER UN BLOG
router.get("/:id", auth, multer, blogCtrl.getOneBlog);

//ROUTE POUR METTRE À JOUR UN BLOG
router.put("/:id", auth, multer, blogCtrl.updateBlog);

//ROUTE POUR SUPPRIMER UN BLOG
router.delete("/:id", auth, multer, blogCtrl.deleteBlog);

module.exports = router;

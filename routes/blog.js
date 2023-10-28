const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");

const auth = require("../middleware/auth");

const blogCtrl = require("../controllers/blog");

router.post("/", auth, multer, blogCtrl.createBlog);

router.put("/:id", auth, multer, blogCtrl.updateBlog);

router.delete("/:id", auth, multer, blogCtrl.deleteBlog);

router.get("/:id", auth, multer, blogCtrl.getOneBlog);

router.get("/", auth, multer, blogCtrl.getAllBlogs);

module.exports = router;

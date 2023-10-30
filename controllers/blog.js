const fs = require("fs");

const auth = require("../middleware/auth");
const Blog = require("../models/Blog");

//FONCTION POUR CREER UN BLOG
exports.createBlog = (req, res, next) => {
  // console.log(req.body.blog);
  const blogObject = req.body;
  delete blogObject._id;
  delete blogObject._userId;

  const today = new Date();

  const blog = new Blog({
    ...blogObject,
    userId: req.auth.userId,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    createdAtBlog: `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`,
  });

  blog
    .save()
    .then(() => {
      res.status(201).json({ message: "blog créée" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//FUNCTION POUR RECUPÉRER TOUS LES BLOGS AJOUTÉS PAR LES UTILISATEURS
exports.getAllBlogs = (req, res, next) => {
  Blog.find()
    .then((blogs) => res.status(200).json(blogs))
    .catch((error) => res.status(400).json({ error }));
};

//ROUTE POUR RECUPÉRER TOUS LES BLOGS AJOUTÉS PAR L'UTILISATEUR
exports.getUserBlogs = (req, res, next) => {
  Blog.find({ userId: req.auth.userId })
    .then((blogs) => {
      res.status(200).json(blogs);
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
  /* 
  res.json({ message: "hey" });
  console.log(req.auth.userId); */
};

//ROUTE POUR RECUPÉRER UN BLOG
exports.getOneBlog = (req, res, next) => {
  Blog.findOne({ _id: req.params.id })
    .then((blog) => res.status(200).json(blog))
    .catch((error) => res.status(404).json({ error }));
};

//FONCTION POUR METTRE À JOUR UN BLOG
exports.updateBlog = (req, res, next) => {
  const blogObject = req.file
    ? {
        ...req.body,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        createdAtBlog: `${today.getDate()}/${
          today.getMonth() + 1
        }/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`,
      }
    : { ...req.body };

  delete blogObject._userId;
  Blog.findOne({ _id: req.params.id })
    .then((blog) => {
      if (blog.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Blog.updateOne(
          { _id: req.params.id },
          { ...blogObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Blog modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//ROUTE POUR SUPPRIMER UN BLOG
exports.deleteBlog = (req, res, next) => {
  Blog.findOne({ _id: req.params.id })
    .then((blog) => {
      if (blog.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = blog.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Blog.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

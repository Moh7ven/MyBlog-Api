const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  titreBlog: {
    type: String,
    required: [true, "Veuillez entrer le titre du blog"],
  },
  soustitreBlog: {
    type: String,
    required: [true, "Veuillez entrer le soustitre du blog"],
  },
  image: { type: String, required: true },
  text: {
    type: String,
    required: [true, "Veuillez entrer le titre du blog"],
  },
  createdAtBlog: {
    type: String,
    required: true,
  },
  userId: { type: String, required: true },
  // Username: { type: String, required: true },
});

module.exports = mongoose.model("blog", blogSchema);

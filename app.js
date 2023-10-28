const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

connectDB();
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;

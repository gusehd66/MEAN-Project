const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes =  require("./routes/posts");

const app = express();

mongoose.connect("mongodb+srv://gusehd66:gus721300@boilerplate.boomm.mongodb.net/posts?retryWrites=true&w=majority")
.then(()=> {
  console.log("Connect DB");
})
.catch(()=> {
  console.log("Connect Fail DB");
})

app.use(bodyParser.json());

app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/posts",postsRoutes);

module.exports = app;

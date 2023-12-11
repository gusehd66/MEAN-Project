const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require('./models/post');

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.post("/api/posts", (req, res, next)=> {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(createPost => {
    res.status(201).json({
      isSuccess: true,
      postId: createPost._id
    });
  });
});

app.get('/api/posts',(req, res, next)=> {
  Post.find()
  .then(document => {
    res.status(200).json({
      isSuccess: true,
      posts: document
    })
  })
  .catch(()=> {
    console.log("ERROR GET POSTS");
  });
});

app.delete("/api/posts/:id", (req, res, next)=> {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({isSuccess: true});
  })
})

module.exports = app;

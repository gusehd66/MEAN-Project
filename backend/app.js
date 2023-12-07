const express = require("express");
const bodyParser = require("body-parser");

const Post = require('./models/post');

const app = express();

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
  console.log(post);
  res.status(201).json({
    isSuccess: true
  });
});

app.get('/api/posts',(req, res, next)=> {
  const posts = [
    {
      id: 'fadf123123',
      title: 'First post',
      content: 'This First content'
    },
    {
      id: 'sdfsees',
      title: 'Second post',
      content: 'This Second content'
    },
  ]
  res.status(200).json({
    isSuccess: true,
    posts: posts
  });
});

module.exports = app;

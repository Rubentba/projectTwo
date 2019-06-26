
var express = require('express');
var router = express.Router();
var post = require('../models/post.js');

router.get("/", function(req, res) {
    post.selectAll(function(data) {
      var hbsObject = {
        post: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });


  router.post("/api/post", function(req,res){
    post.insertOne([req.body.post], function(result){
        res.json({id: result.insertId});
    });
  });

  router.put("/api/post/:id", function(req,res){
    var newPost = "id = " + req.params.id;
    console.log("new Post", newPost);
    post.updateOne(req.params.id, function(result){
      res.status(200).end();
    })
});

router.delete("/api/post/:id", function(req, res) {
    var deletePost = "id = " + req.params.id;
  
    post.delete(deletePost, function(result) {
      if (result.affectedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
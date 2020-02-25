var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");


router.get('/', function(req, res){
    Blog.find({}, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.render('blog/index', {blog:blog, currentUser: req.user});
           
        }
    });
});


router.get('/:_id', function(req, res){
    Blog.findById(req.params._id).populate("comments").exec(function(err, blog){
        if(err){
            console.log(err);
        } else {
            console.log(blog);
            res.render('blog/show', {blog: blog, currentUser: req.user});
        }
    });
});


module.exports = router;
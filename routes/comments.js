var express = require("express");
var router = express.Router({mergeParams: true});

var Blog = require("../models/blog");
var Comment = require("../models/comment");
var middleware = require("../middleware");


router.get("/new", middleware.isLoggedIn,  function(req, res) {
    
    Blog.findById(req.params._id, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {blog: blog});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    Blog.findById(req.params._id, function(err, blog) {
        if(err){
            console.log(err);
            res.redirect("/blog");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err){
                    console.log(err);
                } else {
                    //add username adn id to comment
                    comment.nick.id = req.user._id;
                    comment.nick.username = req.user.username;
                    comment.save();
                    
                    blog.comments.push(comment);
                    blog.save();
                    console.log(comment);
                    res.redirect("/blog/" + blog._id)
                }
            })
        }
    })
})
//comment edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err){
            console.log(err);
        } else {
        
            res.render("comments/edit", {blog_id: req.params._id, comment: comment});
        }
    })
    
})

//comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){  
            console.log(err);
         
          
        } else {
          
            res.redirect("/blog/" + req.params._id ); 
        }
    })
})

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/blog/" + req.params._id);
        }
    })
});




module.exports = router;
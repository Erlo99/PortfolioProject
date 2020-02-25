var Comment = require("../models/comment")

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment) {
            if(err){
                res.redirect("back");
            } else {
                if(comment.nick.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash("error", "you dont have permission to do that!")
                    res.redirect("back");
                }   
            }
        });
    } else {
         req.flash("error", "Login  to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "Please Login First!");
        res.redirect("/blog/login"); 
    };


module.exports = middlewareObj;
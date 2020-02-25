var express = require("express");
var router = express.Router();
var passport = require("passport");
var nodemailer = require('nodemailer');

var Blog = require("../models/blog");
var User =  require("../models/user");

router.get('/', function(req, res){
     Blog.find({}, function(err, blog){
         if(err){
             console.log(err);
         } else {
                     res.render('index', {blog:blog});
                 }
     });
 });
 
 
router.get('/blog/singup', function(req, res) {
    res.render('blog/singup');
});

router.post('/blog/singup', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("blog/singup");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/blog");
        })
    })
});

router.get('/blog/login', function(req, res) {
    res.render('blog/login');
});

router.post('/blog/login', passport.authenticate("local",
    {
            successRedirect: "/blog",
            failureRedirect: "/blog/login"
    }), function(req, res) {
   
});

//logic route
router.get("/blog/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/blog");
});



router.post('/', function(req, res){
    
 // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "//email here",
      pass: "//password here"
    }
  });

  // Specify what the email will look like
  const mailOpts = {
    from: 'Your sender info here', // This is ignored by Gmail
    to: "//email to send",
    subject: 'New message from contact form at portfolio',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.render('contact-fail');
      console.log(error);// Show a page indicating failure
    }
    else {
      res.render('contact-succ'); // Show a page indicating success
    }
  });
});

module.exports = router;
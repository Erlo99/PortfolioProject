var app = require("express")(),
    mongoose = require("mongoose"),
    express = require("express"),
    bodyParser = require("body-parser"),
    nodemailer = require('nodemailer'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    Blog = require("./models/blog"),
    Comment = require("./models/comment"),
    User =  require("./models/user"),
    seedDB = require("./seeds");
    
var commentRoutes = require("./routes/comments"),
    blogRoutes = require("./routes/blog"),
    indexRoutes = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));  
app.use(methodOverride("_method"));
app.use(flash());

//Passport

app.use(require("express-session")({
    secret: "Fuck Niggers",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function (req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use(indexRoutes);
app.use("/blog", blogRoutes);
app.use("/blog/:_id/comments", commentRoutes);


app.listen(8080);
console.log('Listening on port 8080');


require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"));
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
app.set('view engine', 'ejs');



app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



const uri = "mongodb://localhost:27017/userDB";
mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res) {
    res.render("home");
});




app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", function(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    passport.authenticate("local")(req, res, function() {
        req.login(user, function(err) {
            if(err) {
                console.log(err);
            }
        });
        res.redirect("/secrets");
    });
});




app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    User.register({
        username: req.body.username
    },
    req.body.password,
    function(err, user) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secrets");
            })
        }
    });
});


app.get("/secrets", function(req, res) {
    if (req.isAuthenticated()){
        res.render("secrets");
    } else {
        res.redirect("/login");
    };
});


app.get("/logout", function(req, res) {
    req.logOut((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});


app.listen(3000, function() {
    console.log("Server started on port 3000");
});
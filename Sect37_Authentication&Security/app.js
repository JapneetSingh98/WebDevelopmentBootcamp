require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"));
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
app.set('view engine', 'ejs');



const uri = "mongodb://localhost:27017/userDB";
mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = new mongoose.model("User", userSchema);



app.get("/", function(req, res) {
    res.render("home");
});




app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        email: username
    })
    .then((foundUser) => {
        bcrypt.compare(password, foundUser.password)
        .then((result) => {
            if (result === true) {
                res.render("secrets");
            };
        })
        .catch((err) => {
            console.log(err);
        });
        
    })
    .catch((err) => {
        console.log(err);
    });
});




app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {

    bcrypt.hash(req.body.password, saltRounds)
    .then((hash) => {
        const newUser = new User({
            email: req.body.username,
            password: hash
        });

        newUser.save()
        .then(() => {
            res.render("secrets");
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });

    
    
});

// app.get("/secrets", function(req, res) {
//     res.render("secrets");
// });

// app.get("/submit", function(req, res) {
//     res.render("submit");
// });

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
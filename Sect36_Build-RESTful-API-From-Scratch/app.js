const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"));
const mongoose = require("mongoose");
require('dotenv').config();
app.set('view engine', 'ejs');



const uri = "mongodb://localhost:27017/wikiDB";
mongoose.connect(uri);


const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Article = mongoose.model("Article", articleSchema);


app.route("/articles")

    .get( function(req, res) {
        Article.find()
        .then((foundArticles) => {
            res.send(foundArticles);
        })
        .catch((err) => {
            res.send(err);
        });
    })

    .post( function(req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
    
        newArticle.save()
        .then(() => {
            res.status(201).send("Successfully added a new article.");
        })
        .catch((err) => {
            res.send(err);
        });
    })

    .delete( function(req, res) {
        Article.deleteMany()
        .then(() => {
            res.send("Successfully deleted all articles.")
        })
        .catch((err) => {
            res.send(err);
        });
    });


app.route("/articles/:articleTitle")

    .get( function(req, res) {
        const requestedTitle = req.params.articleTitle;
        console.log(requestedTitle);
        Article.findOne({"title": requestedTitle})
        .then((foundArticle) => {
            if(foundArticle) {
                res.send(foundArticle);
            } else {
                res.status(404).send("No articles with that title found.");
            }
        })
        .catch(err => {
            res.send(err);
        });
    })
    
    .put( function(req, res) {
        const requestedTitle = req.params.articleTitle;
        Article.findOneAndReplace({
            "title": requestedTitle
        }, {
            "title": req.body.title,
            "content": req.body.content
        }, {
            "new": true
        })
        .then((newArticle) => {
            if(newArticle) {
                res.send(newArticle);
            } else {
                res.status(404).send("No articles with that title found.");
            }
        })
        .catch(err => {
            res.send(err);
        });
    })
    
    .patch( function(req, res) {
        const requestedTitle = req.params.articleTitle;
        Article.findOneAndUpdate({
            "title": requestedTitle
        },
        req.body,
        {
            "new": true
        })
        .then((newArticle) => {
            if(newArticle) {
                res.send(newArticle);
            } else {
                res.status(404).send("No articles with that title found.");
            }
        })
        .catch(err => {
            res.send(err);
        });
    })
    
    .delete( function(req, res) {
        const requestedTitle = req.params.articleTitle;
        Article.findOneAndDelete({
            "title": requestedTitle
        })
        .then(foundArticle => {
            if(foundArticle) {
                res.send("Successfully deleted article.");
            } else {
                res.status(404).send("No articles with that title found.");
            }
        })
        .catch(err => {
            res.send(err);
        });
    });




app.listen(3000, function() {
    console.log("Server started on port 3000");
});
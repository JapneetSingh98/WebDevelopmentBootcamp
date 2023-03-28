const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"));
const date = require(__dirname + "/date.js");

let items = [];
let workItems = [];

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    
    res.render("list", {
        listTitle : date(),
        newListItems : items
    });
});

app.post("/", function(req, res) {

    let item = req.body.newItem;

    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});


app.get("/work", function(req, res){
    res.render("list", {
        listTitle : "Work List",
        newListItems : workItems
    })
});

app.get("/about", function(req, res) {
    res.render("about");
});


app.listen(3000, function() {
    console.log("Server started on port 3000.");
});
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"));
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

const workout = new Item({
    name: "Workout"
});

const leetcode = new Item({
    name: "Leetcode"
});

const udemy = new Item({
    name: "Udemy"
});

const defaultItems = [workout, leetcode, udemy];



app.set("view engine", "ejs");

app.get("/", function(req, res) {

    Item.find({})
    .then((items) => {

        if(items.length === 0) {
            Item.insertMany(defaultItems)
            .then(() => {
                console.log("Successfully added default items into database.")
            })
            .catch((err) => {
                console.log(err);
            });
            res.redirect("/");

        } else {
            res.render("list", {
                listTitle : "Today",
                newListItems : items
            });
        }
        
    })
    .catch((err) => {
        console.log(err);
    });
    
});

app.post("/", function(req, res) {

    const itemName = req.body.newItem;
    const newItem = new Item({
        name : itemName
    });
    newItem.save();

    res.redirect("/");
});

app.post("/delete", function(req, res) {
    const checkedItemID = req.body.checkbox;
    Item.deleteOne({_id: checkedItemID})
    .then(() => {
        console.log("Successfully deleted checked item from database.");
        res.redirect("/");
    })
    .catch((err) => {
        console.log(err);
    });
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
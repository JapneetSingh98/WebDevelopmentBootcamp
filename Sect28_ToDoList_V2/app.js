const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"));
const mongoose = require("mongoose");
const _ = require("lodash");
require('dotenv').config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

mongoose.connect("mongodb+srv://"+USERNAME+":"+PASSWORD+"@cluster0.pm2tmtm.mongodb.net/todoListDB");

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your ToDo List!"
});

const item2 = new Item({
    name: "Press the + button to add an item."
});

const item3 = new Item({
    name: "<-- Check the box to remove an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
});
const List = mongoose.model("List", listSchema)



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
                listItems : items
            });
        }
        
    })
    .catch((err) => {
        console.log(err);
    });
    
});

app.get("/:customListName", function(req, res) {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName})
    .then((foundList) => {
        if(!foundList) {
            console.log("list not found");
            const list = new List({
                name: customListName,
                items: defaultItems
            });
            list.save()
            .then(() => {
                res.redirect("/"+customListName);
            });
        } else {
            console.log("list found");
            res.render("list", {
                listTitle: foundList.name,
                listItems: foundList.items
            });
        }
    })
    .catch((err) => {
        console.log(err);
    })


});

app.post("/", function(req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;
    const newItem = new Item({
        name : itemName
    });

    if(listName === "Today") {
        newItem.save();
        res.redirect("/");

    } else {
        List.findOne({name: listName})
        .then((foundList) => {
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/" + listName);
        })
    }
    

    
});

app.post("/delete", function(req, res) {
    const checkedItemID = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today") {
        Item.deleteOne({_id: checkedItemID})
        .then(() => {
            console.log("Successfully deleted checked item from database.");
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });

    } else {
        List.findOneAndUpdate({name: listName}, {
            $pull: {items: {_id: checkedItemID}}
        })
        .then(() => {
            res.redirect("/" + listName);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    
});


app.get("/about", function(req, res) {
    res.render("about");
});


app.listen(3000, function() {
    console.log("Server started on port 3000.");
});
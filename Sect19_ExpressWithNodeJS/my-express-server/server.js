const express = require('express');
const app = express();

app.get("/", function(req, res) {
    res.send("<h1>hello</h1>");
});

app.get("/contact", function(req, res){
    res.send("Contact me at: japneet98singh@gmail.com");
});

app.get("/about", function(req, res){
    res.send("Hello, my name is Japneet and I like space");
});

app.get("/test", function(req, res){
    res.send("this is a test");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
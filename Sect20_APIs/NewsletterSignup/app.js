//require installed node packages
const express = require("express");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing")

//create new express app
const app = express();

mailchimp.setConfig({
    apiKey : process.env.API_KEY,
    server : process.env.SERVER_PREFIX
});

//enable express to access static files in folder called "Public"
app.use(express.static("public"));

//enable express to parse URL-encoded body i.e. info from HTML form
app.use(express.urlencoded({ extended: true }));

//GET request
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

//POST request
app.post("/", function (req, res) {
    const listId = process.env.AUDIENCE_ID;

    const subscribingUser = {
        firstName : req.body.fName,
        lastName : req.body.lName,
        email : req.body.email
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address : subscribingUser.email,
            status : "subscribed",
            merge_fields : {
                FNAME : subscribingUser.firstName,
                LNAME : subscribingUser.lastName
            }
        });

        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
    }

    function successCallBack(result) {
        res.sendFile(__dirname + "/success.html");
    }

    function failureCallBack(error) {
        // res.send("There was an error.")
        res.sendFile(__dirname + "/failure.html");
    }

    run().then(successCallBack, failureCallBack);
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

//use express app to listen on 3000 and log when it's working
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.")
});
const assert = require("assert");
// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();

main().catch((err) => console.log(err));

async function main() {
    // const uri = "mongodb+srv://" +process.env.USERNAME+ ":" +process.env.PASSWORD+ "@gettingstarted.zbqcn4w.mongodb.net/?retryWrites=true&w=majority/fruitsDB";
    const uri = "mongodb://127.0.0.1:27017/fruitsDB";
    await mongoose.connect(uri);
}

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Fruits need names!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String,
});

// Creating a model under the schema//
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 4,
    review: "Pretty solid as a fruit.",
});

// fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const pineapple = new Fruit({
//     name: "Pineapple",
//     rating: 7,
//     review: "Good fruit"
// });

// pineapple.save();

const mango = new Fruit({
    name: "Mango",
    rating: 10,
    review: "God Tier"
});

mango.save();

const person = new Person({
    name: "John",
    age: 37,
    // favoriteFruit: pineapple
});

// person.save();

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit!",
});

const orange = new Fruit({
    name: "Orange",
    rating: 4,
    review: "Too sour for me",
});

const banana = new Fruit({
    name: "Banana",
    rating: 3,
    review: "Weird texture",
});

Person.updateOne({name: "John"}, {favoriteFruit: mango})
    .then(() => {
        console.log("Successfully updated document.");
    })
    .catch((err) => {
        console.log(err);
    })

// Fruit.insertMany([kiwi, orange, banana])
//     .then(function () {
//         console.log("Successfully saved all the fruits to fruitsDB.");
//     })
//     .catch(function (err) {
//         console.log(err);
//     });

// Fruit.find()
//     .then((fruits) => {
//         fruits.forEach(fruit => {
//             console.log(fruit.name);
//         });
//     })
//     .catch(err => {
//         console.log(err);
//     });

// Fruit.updateOne({ _id: "6434a7f1f4327e8193165dc0" }, { name: "Peach" })
//     .then(function () {
//         console.log("Successfully updated the document");
//         // mongoose.connection.close();
//     })
//     .catch(function (err) {
//         console.log(err);
//     }); 

// Fruit.deleteOne({ _id: "6434a7f1f4327e8193165dc0" })
//     .then(function() {
//         console.log("Successfully deleted the document");
//         // mongoose.connection.close();
//     })
//     .catch(function (err) {
//         console.log(err);
//     });

// Person.deleteMany({})
//     .then((result) => {
//         console.log("Successfully deleted documents.");
//         console.log(result);
//     })
//     .catch(function (err) {
//         console.log(err);
//     });

// Replace the uri string with your connection string.
// const uri = "mongodb+srv://" +process.env.USERNAME+ ":" +process.env.PASSWORD+ "@gettingstarted.zbqcn4w.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     const dbName = "fruitsDB";
//     const db = client.db(dbName);

//     const myFruits = [
//         {
//             name : "Apple",
//             score : 8,
//             review : "Great fruit"
//         },
//         {
//             name : "Orange",
//             score : 6,
//             review : "Kinda sour"
//         },
//         {
//             name : "Banana",
//             score : 9,
//             review : "Great stuff!"
//         }
//     ];
//     const result = await db.collection("fruitsCol").insertMany(myFruits);

//     console.log(`${result.insertedCount} documents were inserted`);

//     console.log(result);

//     const cursor = await db.collection("fruitsCol").find({}).toArray();
//     console.log(cursor);

//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

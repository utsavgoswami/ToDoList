const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

// const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded(
    { extended: true }
));

app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

const itemSchema = {
    name: String
};

const Item = mongoose.model("Item", itemSchema);

const buy = new Item ({
    name: "Buy Food"
});

const eat = new Item ({
    name: "Eat Food"
});

const cook = new Item ({
   name: "Cook Food" 
});

const defaultItems = [buy, eat, cook];

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

// Item.insertMany(defaultItems, err => err ? console.log(err) : console.log("Successfullly inserted all documents"));

// const items = ["Buy Food", "Eat Food", "Cook Food"];
// const workItems = [];

// Handle user form input
app.post("/", (req, res) => {
    const item = req.body.taskName;
    const listName = req.body.list;

    // Insert into the database 
    const newTask = new Item({
        name: item
    });

    // Check whether we're on the default list or not
    if (listName === "Today") {
        newTask.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}, (err, foundList) => {
            if (!err) {
                foundList.items.push(newTask);
                foundList.save();
                res.redirect("/" + listName);
            } else {
                console.log(err);
            }
        });
        
    }
})

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, err => err ? console.log(err) : console.log("Item successfully removed from db"));
        res.redirect("/");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, (err, foundList) => {
            if (!err) {
                res.redirect("/" + listName);
            }
        })
    }
});

app.get("/", (req, res) => {

    // const day = date.getDate();
    const items = [];

    Item.find({}, (err, results) => {
        if (err) {
            console.log("Unable to read from db");
        } else {
            if (results.length === 0) {
                Item.insertMany(defaultItems, err => err ? console.log(err) : console.log("Successfullly inserted all documents"));
                res.redirect("/");
            } else {
                res.render("list", {
                    listTitle: "Today",
                    newListItem: results
                });
            }
        }
    })

    
});



app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.get("/:name", (req, res) => {
    const name = _.capitalize(req.params.name);

    const tasks = null;

    List.findOne({name: name}, (err, results) => {
        if (err) {
            console.log(err);
        } else if (results === null) {
            // Crate a new list 
            const list = new List({
                name: name,
                items: defaultItems
            });
        
            list.save();
            res.redirect("/" + name);
        } else {
            // Show an existing list 
            res.render("list", {listTitle: results.name, newListItem: results.items});
        }
    })
    
    
}) 

app.post("/work", (req, res) => {
    const item = req.body.taskName;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", (req, res) => {
    res.render("about");
})
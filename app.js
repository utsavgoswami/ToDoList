const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded(
    { extended: true }
));

app.use(express.static("public"));

app.set('view engine', 'ejs');

const items = ["Buy Food", "Eat Food", "Cook Food"];

// Handle user form input
app.post("/", (req, res) => {
    const item = req.body.taskName;

    items.push(item);

    res.redirect("/");
})

app.get("/", (req, res) => {
    const today = new Date();

    // Gets the day of the week in numerical format
    const currentDay = today.getDay();

    const daysOfTheWeek = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };

    // Options for how a date should be represented
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    // Getting datestring with options applied using toLocaleDateString
    const day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        kindOfDay: day,
        newListItem: items
    });
});



app.listen(3000, () => {
    console.log("Server started on port 3000");
});

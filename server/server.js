const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const apiRoutes = require("./api-routes");
const cors = require("cors");
require("custom-env").env("dev");

// Configure bodyparser to handle post requests
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

// Connect to Mongoose and set connection variable
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
const port = process.env.APP_PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("Server is live!"));

// Use Api routes in the App
app.use("/api", apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running server on port " + port);
});

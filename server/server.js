let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let app = express();
let apiRoutes = require("./api-routes");
require("custom-env").env("dev");

// Configure bodyparser to handle post requests
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/todo`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("Server is live!"));

// Use Api routes in the App
app.use("/api", apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running server on port " + port);
});

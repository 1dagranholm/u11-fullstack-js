let express = require("express");

// Initialize server app
let app = express();

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("The server is live!"));

// Launch server to listen to specified port
app.listen(port, function () {
    console.log("Running server on port " + port);
});

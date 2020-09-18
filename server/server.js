let express = require("express");
let apiRoutes = require("./api-routes");

// Initialize server app
let app = express();

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("The server is live!"));

// Use Api routes in the App
app.use("/api", apiRoutes);

// Launch server to listen to specified port
app.listen(port, function () {
    console.log("Running server on port " + port);
});

const express = require('express');
const fs = require('fs')
const https = require('https')
const http = require('http');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const apiRoutes = require('./routes/api-routes');

require('custom-env').env('dev');

const db = require("./models");
const Role = db.role;

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
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
    useCreateIndex: true,
  },
).then(() => {
  console.log("Successfully connect to MongoDB.");
  initial();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Setup server port
const sslPort = process.env.APP_PORT_SSL || 8443;
const port = process.env.APP_PORT || 8080;


// Send message for default URL
app.get('/', (req, res) => res.send('Server is live!'));

// Test secret
app.get('/api/secret', (req, res) => res.send('The password is potato'), apiRoutes);

// Use Api routes in the App
app.use('/api', apiRoutes);

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

https.createServer({
  key: fs.readFileSync(process.env.APP_SSL_KEY),
  cert: fs.readFileSync(process.env.APP_SSL_CERT)
}, app)
.listen(sslPort, function () {
  console.log(`Listening on port ${sslPort} Go to https://localhost:${sslPort}/`)
})

http.createServer(app).listen(port);
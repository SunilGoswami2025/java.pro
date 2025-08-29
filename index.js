require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const MongoStore = require("connect-mongo")(session);

const app = express();
app.use(express.json());

const port = 8000;

app.use(
  session({
    secret: "ojefCCESQ8",
    resave: false,
    saveUninitialized: true,
    cookie: {
       httpOnly: true,
       secure: false, 
       sameSite: "Lax"
      },
    store: new MongoStore({
      url: "mongodb://localhost:27017/Auth_Product",
      ttl: 14 * 24 * 60 * 60, 
    }),
  })
);


// Serve static files from /public
app.use("/images", express.static(path.join(__dirname, "product/images")));

app.use("/auth", require("./src/Auth/routes"));
app.use("/Users", require("./src/Users/routes"));
app.use("/Products", require("./src/Product/routes"));

// db connection

app.get("/test", (req, res) => {
  res.json({ msg: "Welcome to the world", env: process.env.TEST });
});

app.listen(port, async () => {
  await mongoose.connect("mongodb://localhost:27017/Auth_Product", {
    autoIndex: false,
  });
  console.log(" Server started on port " + port);
});

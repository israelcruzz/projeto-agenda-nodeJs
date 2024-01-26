require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const app = express();
const path = require("path");
const routes = require("./routes");
const port = 3131;
const connectionDB = process.env.CONNECTIONSTRING;
const { localsMessages } = require('./src/middlewares/globalMiddleware')

const startServer = async () => {
  try {
    await mongoose.connect(connectionDB);
    console.log("🚀 MongoDB Init");

    const sessionOptions = session({
      secret: 'chave',
      store: MongoStore.create({
        mongoUrl: `${connectionDB}`
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      }
    })

    app.use(sessionOptions)
    app.use(flash())

    app.use(express.urlencoded({ extended: true }));
    app.set("views", path.resolve(__dirname, "src", "Views"));
    app.set("view engine", "ejs");
    app.use(localsMessages)

    app.use(routes);

    app.listen(port, () => {
      console.log(`🚀 Server Init: http://localhost:${port}/`);
    });
  } catch (error) {
    console.log(`💀 Connection in MongoDB is Bad Succesfull: ${error}`);
  }
};

startServer();

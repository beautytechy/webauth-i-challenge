const express = require("express");

const sessions = require("express-session"); 
const KnexSessionStore = require("connect-session-knex")(sessions); // to store sessions in database

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const knex = require("../data/dbConfig.js");

const server = express();

const sessionConfiguration = {
  // session storage options
  name: "lemonade", // default would be sid
  secret: "supersafesecret", // used for encryption (must be an environment variable)
  saveUninitialized: false, // has implications with GDPR laws
  resave: false,

  // how to store the sessions
  store: new KnexSessionStore({
    // DO NOT FORGET THE new KEYWORD
    knex, // imported from dbConfig.js
    createtable: true,

    // optional
    sidfieldname: "sid",
    tablename: "sessions",
  }),

  // cookie options
  cookie: {
    maxAge: 5 * 60 * 1000, // session will be good for 10 minutes in milliseconds
    secure: false, // if false the cookie is sent over http, if true only sent over https
    httpOnly: true, // if true JS cannot access the cookie
  },
};


server.use(express.json());
server.use(sessions(sessionConfiguration)); // adds a req.session object

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ API: "It's working" });
});

module.exports = server;
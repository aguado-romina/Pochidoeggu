const db = require("../models");
const passport = require("../config/passport");

const express = require("express");
const APIrouter = express.Router();

APIrouter.post("/api/signup", (req, res) => {
  db.Account.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then(() => {
      res.render("login");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
APIrouter.post("/api/login", passport.authenticate("local"), (req, res) => {
  res
    .json({
      username: req.user.username,
      id: req.user.id,
    })
    //-------------------------------------------------------------step 2 sends the userData to passport.js
    .then(() => {
      res.render("dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  //---------------------------------------------step 4 sends a response of the username and id of the account logged in then we go back to login.js
});
module.exports = APIrouter;

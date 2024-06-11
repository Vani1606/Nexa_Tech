const express = require("express");
const router = express.Router();

// app.get("/", (req, res) => {
//   res.status(200).send("Welcome to thapa technical Mern Series Updated");
// });

router.route("/").get((req, res) => {
  res.status(200).send("Welcome to thapa technical Mern Series Updated");
});

// app.get("/register", (req, res) => {
//   res.status(200).json({ msg: "registration successful" });
// });
router.route("/register").get((req, res) => {
  res.status(200).json({ msg: "registration successful from router" });
});

module.exports = route
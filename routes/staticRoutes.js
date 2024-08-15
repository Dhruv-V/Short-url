const express = require("express");
const { getUser } = require("../services/userAuthMap");

const staticRouter = express.Router();

staticRouter.get("/", async (req, res) => {
  const uuid = req.cookies.uuid;
  const user = getUser(uuid);
  if (!uuid || !user) return res.redirect("/login");
  return res.render("home");
});

staticRouter.get("/signin", async (req, res) => {
  return res.render("signin");
});

staticRouter.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = { staticRouter };

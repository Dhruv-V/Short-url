const { v4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../services/userAuthMap");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await User.create({
      name,
      email,
      password,
    });
    return res.status(200).redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    const sessionId = v4();
    setUser(sessionId, { email, password });
    res.cookie("uuid", sessionId);
    return res.redirect("/url");
  } else return res.redirect("/signin");
};

module.exports = { createUser, loginUser };

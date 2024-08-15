const User = require("../models/user");
const { getUser } = require("../services/userAuthMap");

const authorizeUser = (req, res, next) => {
  const uuid = req.cookies?.uuid;
  const userFromMap = getUser(uuid);
  console.log(uuid, userFromMap, req.cookies);
  if (!uuid || !userFromMap) return res.redirect("/login");
  res.user = userFromMap;
  next();
};

module.exports = authorizeUser;

const express = require("express");
const {
  createShortUrl,
  goToUrl,
  getAllUrl,
} = require("../controllers/short-url");

const router = express.Router();

router.get("/:shortId", goToUrl);

router.post("/", createShortUrl).get("/", getAllUrl);

module.exports = router;

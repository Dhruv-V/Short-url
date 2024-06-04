const shortid = require("shortid");
const short_url = require("../models/short-url");

const createShortUrl = async (req, res) => {
  const body = req.body;
  const shortUrl = shortid();
  if (!req.body.main_url) return res.status(400).send("A url is required ");
  else {
    await short_url.create({
      main_url: body.main_url,
      short_url: shortUrl,
      user_activity: { clicks: 0, timestamps: [] },
    });
  }
  return res.status(201).send("Successfully Created");
};

const goToUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    if (!shortId) return res.status(404).send("URL not found");

    const entry = await short_url.findOneAndUpdate(
      { short_url: shortId },
      {
        $inc: { "user_activity.clicks": 1 },
        $push: {
          "user_activity.timestamps": `${Date.now()}}`,
        },
      }
    );
    //     {
    //   $inc: { "user_activity.clicks": 1 },
    //   $push: {
    //     "user_activity.timestamps": `${Date.now()}}`,
    //   },
    // }
    console.log(entry);
    res.redirect(entry.main_url);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred");
  }
};

const getAllUrl = async (req, res) => {
  const results = await short_url.find({});
  return res.status(200).json(results);
};

module.exports = { createShortUrl, goToUrl, getAllUrl };

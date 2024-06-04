const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    main_url: {
      type: String,
      required: true,
      unique: true,
    },
    short_url: {
      type: String,
    },
    user_activity: { clicks: { type: Number }, timestamps: [{ type: String }] },
    // clicks: { type: Number },
  },
  { timestamps: true }
);

const short_url = mongoose.model("shortUrl", urlSchema);

module.exports = short_url;

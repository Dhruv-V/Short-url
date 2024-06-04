const express = require("express");
const { connectToMongo } = require("./connection");
const shortUrlRouter = require("./routes/short_url");
const PORT = 8001;
const mongoUrl = "mongodb://127.0.0.1:27017/short-url";
const app = express();

connectToMongo(mongoUrl).then(() =>
  console.log("database connected successfully")
);

app.use(express.json());
app.use("/url", shortUrlRouter);

app.listen(PORT, () =>
  console.log(`server started successfully at PORT:${PORT}`)
);

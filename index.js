const express = require("express");
const { connectToMongo } = require("./connection");
const shortUrlRouter = require("./routes/short_url");
const { staticRouter } = require("./routes/staticRoutes");
const userRouter = require("./routes/userRoutes");
const path = require("path");
const authorizeUser = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const PORT = 8001;
const mongoUrl = "mongodb://127.0.0.1:27017/short-url";
const app = express();

connectToMongo(mongoUrl).then(() =>
  console.log("database connected successfully")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/url", authorizeUser, shortUrlRouter);
app.use("/", staticRouter);
app.use("/user", userRouter);

app.listen(PORT, () =>
  console.log(`server started successfully at PORT:${PORT}`)
);

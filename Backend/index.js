const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const formrouter = require("./router/formrouter");
const evalrouter = require("./router/evalrouter");

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/form", formrouter);
app.use("/client", evalrouter);
PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL, console.log("connected"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

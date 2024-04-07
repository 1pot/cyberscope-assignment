const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const coinsRoute = require("./routes/coins/coins");

dotenv.config({ path: "./config/config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", coinsRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

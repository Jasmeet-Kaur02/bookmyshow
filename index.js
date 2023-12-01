const express = require("express");
const app = express();
require("dotenv").config();
const replaceENV = require("./database/replaceENV");
const { getCities } = require("./src/controllers/TheatreController");
const cityRouter = require("./src/routes/city");
const theatreRouter = require("./src/routes/theatre");

const PORT = 8000;
app.use(express.json());

replaceENV();

app.get("/cities", getCities);
app.use("/cities", cityRouter);
app.use("/theatres", theatreRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error while running server on the PORT ${PORT}`);
  }
  console.log(`Server is running on the PORT ${PORT}`);
});

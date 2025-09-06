const express = require("express");
require("dotenv").config();

const app = express();

app.use("/", (req, res) => {
  res.send("Server Running....");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running port ${port}`);
});

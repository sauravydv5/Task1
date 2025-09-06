const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Server Running....");
});

app.listen(3000, () => {
  console.log(`Server running port ${3000}`);
});

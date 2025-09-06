const express = require("express");
const connectDB = require("./src/config/db");
const router = require("./src/Router/authRoute"); // <-- fixed
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running....");
});

// Mount auth router under /auth
app.use("/auth", router);

const port = process.env.PORT || 3001;

// connect DB and start server
connectDB()
  .then(() => {
    console.log("Database Connected successfully...");
    app.listen(port, () => {
      console.log(`Server is running Successfully on PORT ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected..", err);
    process.exit(1);
  });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // 👈 जोड़ा
const connectDB = require("./src/config/db");
const authRouter = require("./src/Router/authRoute");
const itemRouter = require("./src/Router/itemRoutes");
require("dotenv").config();

const app = express();

// Allow requests from React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser()); // 👈 जोड़ा

// Root route
app.get("/", (req, res) => {
  res.send("Server Running...");
});

// Mount routers
app.use("/auth", authRouter);
app.use("/items", itemRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

const port = process.env.PORT || 3001;

// Connect DB and start server
connectDB()
  .then(() => {
    console.log("Database Connected successfully...");
    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected:", err);
    process.exit(1);
  });

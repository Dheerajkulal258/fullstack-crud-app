const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve Frontend (VERY IMPORTANT)
app.use(express.static("public"));

// API Routes
app.use("/api/items", require("./routes/itemRoutes"));

// Test Route (optional)
app.get("/test", (req, res) => {
  res.send("Server is working");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
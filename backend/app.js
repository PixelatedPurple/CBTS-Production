require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const chatRoutes = require("./routes/chats");
const serviceRoutes = require("./routes/services");
const adRoutes = require("./routes/ads");
const errorHandler = require("./middleware/errorHandler");

// Initialize app
const app = express();

// Middleware
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/ads", adRoutes);

// Error Handler
app.use(errorHandler);

// Health Check
app.get("/api/status", (req, res) => {
    res.json({ status: "Server is running!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
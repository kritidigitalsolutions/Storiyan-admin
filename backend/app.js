const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const seedDatabase = require("./utils/seeder");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Import Routes
const adminRoutes = require("./routes/admin/admin.routes");
const userRoutes = require("./routes/user/user.routes");
const userAuthRoutes = require("./routes/user/auth.routes");

// Mount Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user/auth", userAuthRoutes);
app.use("/api/user", userRoutes);

// Root health check
app.get("/", (req, res) => {
  res.json({
    name: "Storiyan Vertical Drama Streaming API",
    status: "online",
    version: "2.0.0",
    adminEndpoints: "/api/admin",
    userEndpoints: "/api/user",
  });
});

// Auto-seed initial catalog data on startup if database is empty
setTimeout(() => {
  seedDatabase().catch((err) => console.log("Seeder startup notice:", err.message));
}, 1500);

module.exports = app;
const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("./models/admin.model"); // Adjust path to your schema
const adminRoutes = require("./routes/admin/auth.routes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const userAuthRoutes = require("./routes/user/auth.routes");
app.use(express.json());
app.use(cors());

// app.use("/", (req, res) => {
//     res.json({ message: "Welcome to Storiyan Backend API" })
// })


// Admin routes
app.use("/api/admin", adminRoutes);



// user routes
// Inside your app.js file

// Mount the user authentication routes
app.use("/api/user/auth", userAuthRoutes);

// Function to automatically create a custom admin account if none exists
// this is for first time add new admin data
const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    name: "Super Admin",
    email: "admin@gmail.com",
    password: hashedPassword
  });

  console.log("Admin created");
};
createAdmin().catch(err => console.log("Admin already exists or error:", err.message));


module.exports = app;
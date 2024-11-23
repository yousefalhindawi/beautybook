const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const staffRoutes = require("./routes/staffRoutes");
const reportRoutes = require("./routes/reportRoutes");
const { authenticateToken } = require("./controllers/authController");
// const adminRoutes = require("./routes/adminRoutes");
const app = express();

/* Start Of Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cors for cross origin allowance
app.use(cors());
/* End Of Middleware*/

// Define Routes
// Authentication routes
app.use("/auth", authRoutes);
// auth middleware
app.use(authenticateToken);
app.use("/appointments", appointmentRoutes);
app.use("/services", serviceRoutes);
app.use("/staffs", staffRoutes);
app.use("/reports", reportRoutes);
// Admin routes
// app.use("/admin", adminRoutes);
// Server Setup
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT || 5000}`);
  });

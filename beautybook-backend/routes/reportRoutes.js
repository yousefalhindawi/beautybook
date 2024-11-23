const router = require("express").Router();
const { authenticateToken } = require("../auth/auth");
const {
  generateAppointmentReport,
} = require("../controllers/reportController");

router.get("/appointments", authenticateToken, generateAppointmentReport);

module.exports = router;

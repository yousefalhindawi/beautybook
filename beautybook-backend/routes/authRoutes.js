const express = require("express");
const { loginUser, registerUser } = require("../controllers/authController");
const { authenticateCustomer } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route for customer login
router.post("/login", loginUser);

// Route for customer registration
router.post("/register",registerUser);

// Protected route example (can be extended for other purposes)
router.get("/protected", authenticateCustomer, (req, res) => {
  res.json({ message: "Access granted", customerId: req.customerId });
});

module.exports = router;

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY; // Same key as used in authController

// Middleware to authenticate JWT token
const authenticateCustomer = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    // req.customerId = user.id; // Attach the logged-in customer ID to the request
    // req.role = user.role; // Attach the user role (e.g., "customer") to the request
    req.user = user; // Attach the user object to the request
    next();
  });
};

// Middleware to authorize specific roles
const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { authenticateCustomer, authorizeRole };

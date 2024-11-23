const router = require("express").Router();
const {
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffs,
} = require("../controllers/staffController");
const {
//   getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const {
  authenticateCustomer,
  authorizeRole,
} = require("../middlewares/authMiddleware");

// Admin-only routes
router.use(authenticateCustomer, authorizeRole(["admin"])); // Protect all admin routes

router.post("/staff", createStaff);
router.put("/staff/:id", updateStaff);
router.delete("/staff/:id", deleteStaff);
router.get("/staff", getStaffs);

// router.get("/", getServices);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;

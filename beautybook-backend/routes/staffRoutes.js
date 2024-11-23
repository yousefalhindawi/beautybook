const router = require("express").Router();
const {
    getStaffs,
    createStaff,
    updateStaff,
    deleteStaff,
} = require("../controllers/staffController");

router.get("/", getStaffs);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

module.exports = router;
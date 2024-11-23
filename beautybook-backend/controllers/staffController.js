// const prisma = require("../models/prisma-client");

// const getStaffs = async (req, res) => {
//   try {
//     const staffs = await prisma.staff.findMany();
//     res.status(200).json(staffs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const createStaff = async (req, res) => {
//   const { name } = req.body;
//   try {
//     console.log("name", name);
//     const staff = await prisma.staff.create({
//       data: { name },
//     });
//     res.status(201).json(staff);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateStaff = async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   try {
//     const staff = await prisma.staff.update({
//       where: { id: parseInt(id) },
//       data: { name },
//     });
//     res.status(200).json(staff);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const deleteStaff = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await prisma.staff.delete({ where: { id: parseInt(id) } });
//     res.status(200).json({ message: "Staff deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   getStaffs,
//   createStaff,
//   updateStaff,
//   deleteStaff,
// };

const prisma = require("../models/prisma-client");

// Get all staff members (accessible to admins only)
const getStaffs = async (req, res) => {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: { name: "asc" },
    });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin-only: Create a new staff member
const createStaff = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newStaff = await prisma.staff.create({
      data: { name, email, phone },
    });
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin-only: Update a staff member
const updateStaff = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedStaff = await prisma.staff.update({
      where: { id: parseInt(id) },
      data: { name, email, phone, updatedAt: new Date() },
    });

    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin-only: Delete a staff member
const deleteStaff = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.staff.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStaffs,
  createStaff,
  updateStaff,
  deleteStaff,
};

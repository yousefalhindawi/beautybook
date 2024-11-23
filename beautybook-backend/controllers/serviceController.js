// const prisma = require("../models/prisma-client");

// const getServices = async (req, res) => {
//   try {
//     const services = await prisma.service.findMany();
//     res.status(200).json(services);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const createService = async (req, res) => {
//   const { name, price } = req.body;
//   try {
//     const service = await prisma.service.create({
//       data: { name, price: parseFloat(price) },
//     });
//     res.status(201).json(service);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateService = async (req, res) => {
//   const { id } = req.params;
//   const { name, price } = req.body;
//   try {
//     const service = await prisma.service.update({
//       where: { id: parseInt(id) },
//       data: { name, price: parseFloat(price) },
//     });
//     res.status(200).json(service);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const deleteService = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await prisma.service.delete({ where: { id: parseInt(id) } });
//     res.status(200).json({ message: "Service deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   getServices,
//   createService,
//   updateService,
//   deleteService,
// };

const prisma = require("../models/prisma-client");

// Get all services (accessible to all users)
const getServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: "asc" },
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin-only: Create a new service
const createService = async (req, res) => {
  const { name, description, price, duration } = req.body;

  try {
    const newService = await prisma.service.create({
      data: { name, description, price, duration },
    });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin-only: Update a service
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, duration } = req.body;

  try {
    const updatedService = await prisma.service.update({
      where: { id: parseInt(id) },
      data: { name, description, price, duration },
    });

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin-only: Delete a service
const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.service.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService,
};

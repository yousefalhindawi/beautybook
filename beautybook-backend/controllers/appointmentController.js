// const prisma = require("../models/prisma-client");

// const getAppointments = async (req, res) => {
//   try {
//     const appointments = await prisma.appointment.findMany({
//       include: { service: true, staff: true },
//     });
//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const createAppointment = async (req, res) => {
//   const { date, serviceId, staffId } = req.body;
//   try {
//     const appointment = await prisma.appointment.create({
//       data: { date: new Date(date), serviceId, staffId },
//     });
//     res.status(201).json(appointment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateAppointment = async (req, res) => {
//   const { id } = req.params;
//   const { date, serviceId, staffId } = req.body;
//   try {
//     const appointment = await prisma.appointment.update({
//       where: { id: parseInt(id) },
//       data: { date: new Date(date), serviceId, staffId },
//     });
//     res.status(200).json(appointment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const deleteAppointment = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await prisma.appointment.delete({ where: { id: parseInt(id) } });
//     res.status(200).json({ message: "Appointment deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   getAppointments,
//   createAppointment,
//   updateAppointment,
//   deleteAppointment,
// };

const prisma = require("../models/prisma-client");

// Create a new appointment
const createAppointment = async (req, res) => {
  const { serviceId, staffId, date, status } = req.body;
  try {
    const userId = req.user.userId;
    // const userId = 1;
    const newAppointment = await prisma.appointment.create({
      data: {
        serviceId,
        staffId,
        userId,
        date: date ? date : new Date(),
        status,
      },
    });
    const appointment = await prisma.appointment.findUnique({
      where: { id: newAppointment.id },
      include: { service: true, staff: true },
    });
    res.status(201).json({
      ...appointment,
      serviceName: appointment.service.name,
      servicePrice: appointment.service.price,
      serviceDuration: appointment.service.duration,
      staffName: appointment.staff.name,
      staffPhone: appointment.staff.phone,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all appointments for the logged-in customer
const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.userId;
    // const userId = 1;
    const appointments = await prisma.appointment.findMany({
      where: { userId },
      include: { service: true, staff: true },
      orderBy: { date: "asc" },
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an appointment (only for the logged-in customer)
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, serviceId, staffId, status } = req.body;
  const userId = req.user.userId;

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!appointment || appointment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this appointment" });
    }

    const updateAppointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: { date: new Date(date), serviceId, staffId, status },
    });

    const updatedAppointment = await prisma.appointment.findUnique({
      where: { id: updateAppointment.id },
      include: { service: true, staff: true },
    });
    res.status(200).json({
      ...updatedAppointment,
      serviceName: updatedAppointment.service.name,
      servicePrice: updatedAppointment.service.price,
      serviceDuration: updatedAppointment.service.duration,
      staffName: updatedAppointment.staff.name,
      staffPhone: updatedAppointment.staff.phone,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an appointment (only for the logged-in customer)
const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!appointment || appointment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this appointment" });
    }

    await prisma.appointment.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAppointment,
  getUserAppointments,
  updateAppointment,
  deleteAppointment,
};

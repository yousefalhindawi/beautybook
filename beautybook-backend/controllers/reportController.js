const PDFDocument = require("pdfkit");
const prisma = require("../models/prisma-client");

const generateAppointmentReport = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: { service: true, staff: true },
    });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="appointments.pdf"');

    doc.text("Appointments Report", { align: "center" });
    appointments.forEach((appt) => {
      doc.text(
        `Date: ${appt.date}, Service: ${appt.service.name}, Staff: ${appt.staff.name}`
      );
    });

    doc.end();
    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateAppointmentReport };

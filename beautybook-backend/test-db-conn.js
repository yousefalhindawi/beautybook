const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express();
// const dotenv = require("dotenv");
// dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// Routes will go here...
app.get("/test", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log(users)
    res.st;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT || 5000}`);
});

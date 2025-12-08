import express from "express";
import prisma from "./prismaClient.mjs";

const app = express();
app.use(express.json());

// GET all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// CREATE employee
app.post("/employees", async (req, res) => {
  const { name, age, salary } = req.body;

  try {
    const emp = await prisma.employee.create({
      data: { name, age, salary },
    });

    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).send("Insert failed");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

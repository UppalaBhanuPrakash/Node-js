import express from "express";
import { query } from "./postgre.mjs";

const app = express();
app.use(express.json());

app.get("/employees", async (req, res) => {
  try {
    const result = await query("SELECT * FROM employees WHERE id = $1 AND age=$2", [1,25]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// INSERT employee
app.post("/employees", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  const { name, age } = req.body;

  try {
    const result = await query(
      "INSERT INTO employees (name, age,salary) VALUES ($1, $2,$3) RETURNING *",
      [name, age]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Insert failed");
  }
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

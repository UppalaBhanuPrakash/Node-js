import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const BASE_URL = "https://jsonplaceholder.typicode.com/users";
app.get("/",async(req,res)=>{
    const response=await axios.get(BASE_URL);
    res.json(response.data);
})

app.get("/users", async (req, res) => {
  const response = await axios.get(BASE_URL);
  res.json(response.data);
});

app.get("/users/:id", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/${req.params.id}`);
    res.json(response.data);
  } catch {
    res.status(404).send("User not found");
  }
});

app.post("/users", async (req, res) => {
  const response = await axios.post(BASE_URL, req.body);
  res.status(201).json(response.data);
});

app.put("/users/:id", async (req, res) => {
  const response = await axios.put(`${BASE_URL}/${req.params.id}`, req.body);
  res.json(response.data);
});

app.delete("/users/:id", async (req, res) => {
  await axios.delete(`${BASE_URL}/${req.params.id}`);
  res.send("User deleted (fake)");
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);

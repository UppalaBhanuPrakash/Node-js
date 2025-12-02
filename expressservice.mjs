import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Akhil" },
  { id: 2, name: "Bhanu" },
];

app.get("/", (req, res) => res.send("Welcome to Express API!"));

// app.get("/index",(req,res)=>{
//   res.sendFile("C:/Users/Bhanu Uppala/Desktop/Node/node/index.html")
// })

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/users", (req, res) => res.json(users));

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  console.log(req.params.id)
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name;
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.send("User deleted");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

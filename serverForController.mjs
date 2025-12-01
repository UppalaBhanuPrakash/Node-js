import express from "express";
import userRoutes from "./routes/users.mjs"

const app=express();
app.use(express.json())

app.get("/",(req,res)=>res.send("Welcome to Express API"));

app.use("/users",userRoutes);

app.listen(3000,()=>
    console.log("Server is running on http://localhost:3000")
)
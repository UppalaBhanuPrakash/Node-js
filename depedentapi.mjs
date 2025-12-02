import express from "express";
import axios from "axios";

const app=express();
app.use(express.json());

app.get("/user-with-posts/:id",async(req,res)=>{
    try{
        const userId=req.params.id;
        const userResponse=await axios.get( `https://jsonplaceholder.typicode.com/users/${userId}`);
        const user=userResponse.data;

        const postResponse=await axios.get( `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);

        const posts=postResponse.data;

        res.json({
            message:"Dependent API executed successfully",
            user,
            posts,
        });
    }catch(error){
        res.status(500).json({error:"User not found or error fetching depenet data"})
    }
});

app.get("/",(req,res)=>{
    res.send("Server is running.Try: /user-with-posts/1");
});

app.listen(3000,()=>{
    console.log("Server is running at http://localhost:3000");
})
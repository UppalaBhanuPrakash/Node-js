import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(BASE_URL);
    res.json({
      message: "Root API working!",
      usersCount: response.data.length,
      users: response.data,
    });
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

app.get("/combined-data", async (req, res) => {
  try {
    const [users, posts] = await Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/users"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
    ]);

    res.json({
      totalUsers: users.data.length,
      totalPosts: posts.data.length,
      data: users.data.map(u => ({
        ...u,
        posts: posts.data.filter(p => p.userId === u.id),
      })),
    });
  } catch {
    res.status(500).send("Error in parallel APIs");
  }
});

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);

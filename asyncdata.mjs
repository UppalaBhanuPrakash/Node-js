import express from "express";
import axios from "axios";

const app = express();

app.get("/user-with-posts/:id", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const userId = req.params.id;

  res.write(`data: Processing started for user ${userId}\n\n`);

  try {
    res.write(`data: Fetching user...\n\n`);
    const userResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = userResponse.data;
    res.write(`data: Fetching posts...\n\n`);
    const postsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );
    const posts = postsResponse.data;
    res.write(`data: ${JSON.stringify({ user, posts })}\n\n`);
    res.end();
  } catch (error) {
    res.write(`data: Error occurred\n\n`);
    res.end();
  }
});

app.listen(3000, () => {
  console.log("SSE server running at http://localhost:3000");
});

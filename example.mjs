import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname));

app.get("/user-with-posts/:id", async (req, res) => {

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const userId = req.params.id;

  res.write(`event: status\ndata: Processing started\n\n`);

  try {
    res.write(`event: status\ndata: Fetching user...\n\n`);
    const userResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = userResponse.data;

    res.write(`event: status\ndata: Fetching posts...\n\n`);
    const postsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );
    const posts = postsResponse.data;

    res.write(`event: final\ndata: ${JSON.stringify({ user, posts })}\n\n`);
    res.end();

  } catch (err) {
    res.write(`event: final\ndata: {"error":"Something went wrong"}\n\n`);
    res.end();
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

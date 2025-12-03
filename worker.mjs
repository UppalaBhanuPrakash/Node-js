import axios from "axios";
import { parentPort, workerData } from "worker_threads";

async function loadUserData(userId) {
  parentPort.postMessage(`Fetching user details...`);

  const userResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user = userResponse.data;

  parentPort.postMessage(`User fetched: ${user.name}`);

  parentPort.postMessage(`Fetching posts...`);
  
  const postsResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  const posts = postsResponse.data;

  parentPort.postMessage(`Fetched ${posts.length} posts`);

  // Final result
  parentPort.postMessage(
    JSON.stringify({
      user,
      posts,
      status: "completed",
    })
  );
}

(async () => {
  try {
    await loadUserData(workerData.userId);
  } catch (err) {
    parentPort.postMessage(`ERROR: ${err.message}`);
  }
})();


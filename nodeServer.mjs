import http from "http";

let users = [
  { id: 1, name: "Akhil" },
  { id: 2, name: "Bhanu" }
];

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(error);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res.end(JSON.stringify({ message: "Welcome to Pure Node.js API!" }));
  }

  else if (url === "/users" && method === "GET") {
    res.end(JSON.stringify(users));
  }

  else if (url.startsWith("/users/") && method === "GET") {
    const id = url.split("/")[2];
    const user = users.find(u => u.id == id);
    if (!user) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: "User not found" }));
    }
    res.end(JSON.stringify(user));
  }

  else if (url === "/users" && method === "POST") {
    try {
      const body = await getRequestBody(req);

      const newUser = {
        id: users.length + 1,
        name: body.name
      };

      users.push(newUser);

      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  }

  else if (url.startsWith("/users/") && method === "PUT") {
    const id = url.split("/")[2];
    const user = users.find(u => u.id == id);

    if (!user) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: "User not found" }));
    }

    try {
      const body = await getRequestBody(req);
      user.name = body.name;
      res.end(JSON.stringify(user));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  }

  else if (url.startsWith("/users/") && method === "DELETE") {
    const id = url.split("/")[2];

    users = users.filter(u => u.id != id);
    res.end(JSON.stringify({ message: "User deleted" }));
  }

  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


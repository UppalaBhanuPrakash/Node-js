const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log(` Request Method: ${req.method}  URL: ${req.url}`);
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.send(`Hello World! Time: ${req.requestTime}`);
});

const mw1 = (req, res, next) => {
 console.log("")
  next();
 
};

const mw2 = (req, res, next) => {
  console.log("Middleware 2 executed");
  next();
};

app.get("/chain/hello", mw1, mw2, (req, res) => {
  res.send("All middlewares executed successfully!");
});

app.use((err, req, res, next) => {
  console.error(" Error caught by middleware:", err.message);
  res.status(500).send("Something went wrong on the server!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

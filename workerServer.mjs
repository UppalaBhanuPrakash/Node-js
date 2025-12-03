import express from "express";
import { Worker } from "worker_threads";

const app = express();

app.get("/user-with-posts/:id", (req, res) => {
  const userId = req.params.id;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write(`data: Processing started for user ${userId}\n\n`);

  const worker = new Worker("./worker.mjs", {
    workerData: { userId }
  });

  worker.on("message", (msg) => {
    res.write(`data: ${msg}\n\n`);
  });

  worker.on("error", (err) => {
    res.write(`data: ERROR: ${err.message}\n\n`);
    res.end();
  });

  worker.on("exit", () => {
    res.write("event: end\ndata: done\n\n");
    res.end();
  });
});

app.listen(3000, () => {
  console.log("Worker SSE server running on http://localhost:3000");
});


// import express from "express";
// import { Worker } from "worker_threads";

// const app=express()

// app.get("/",(req,res)=>{
//   const userId=req.params.id;

//   res.setHeader("Content-Type","text/event-stream");
//   res.setHeader("Cache-Control","no-cache");
//   res.header("Connection","keep-alive");

//   res.write(`data:processing started for ${userId}\n\n`)

//   const worker=new Worker("./worker.js",{
//     workerData:{userId}
//   });

//   worker.on("message",(msg)=>{
//     res.write(`data:${msg}\n\n`)
//   });

//   worker.on("error",(err)=>{
//     res.write(`data:Error: ${err.message}\n\n`);
//     res.end();
//   })

//   worker.on("exit",()=>{
//     res.write("event:end");
//     res.end();
//   })
// });

// app.listen(3000,()=>{
//   console.log("Worker SSE server running on http://localhost:3000");
// })
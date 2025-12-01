import http from "http";

const server=http.createServer((req,res)=>{
    if (req.url === "/") {
    res.end("Home Page");
  } else if (req.url === "/about") {
    res.end("About Page");
  } else if (req.url === "/contact") {
    res.end("Contact Page");
  } else {
    res.writeHead(404);
    res.end("Page Not Found");
  }
});

server.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
})
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "message.txt");

console.log(filePath);

// const path = require("path");
 
// const filePath = path.join(
//   __dirname,
//   "hello.txt"
// )
// console.log(filePath);
 

// fs.readFile("message.txt","utf-8",(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("FIle Read Successfully",data)
//     }
// })

// fs.appendFile("message.txt","\nAppended line!",(err)=>{
//     if(err)console.log(err);
//     else console.log("Content Appended!")
// })

// fs.unlink("message.txt", (err) => {
//   if (err) console.log("Error deleting file:", err);
//   else console.log("File deleted!");
// });

// fs.mkdir("myFolder", (err) => {
//   if (err) console.log(err);
//   else console.log("Folder created!");
// });

// fs.readdir("myFolder", (err, files) => {
//   if (err) console.log(err);
//   else console.log("Files:", files);
// });

// fs.rmdir("myFolder", (err) => {
//   if (err) console.log(err);
//   else console.log("Folder removed!");
// });
const fs = require('fs').promises;

async function readFileExample() {
  try {
    const data = await fs.readFile('message.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

readFileExample();

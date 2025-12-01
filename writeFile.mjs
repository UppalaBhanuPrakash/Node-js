import fs from "fs";

fs.writeFile("message.txt","Hello, Node.js!",(err)=>{
    if(err){
        console.log("Error writing file:",err);
    }else{
        console.log("File written successfully !");
    }
});
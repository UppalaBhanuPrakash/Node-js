// const { Worker } = require('worker_threads');

// console.log("Main thread started");

// const worker = new Worker('./workerpractice.js');

// worker.on('message', msg => {
//     console.log("Result from worker:", msg);
// });
// worker.on('error', err => {
//     console.log("Worker Error:", err.message);
// });

// worker.on('exit', code => {
//     console.log("Worker exited with code:", code);
// });


// const { Worker } = require('worker_threads');

// const worker = new Worker('./workerpractice.js', {
//     workerData: { limit: 11 }
// });

// worker.on('message', result => console.log("Sum:", result));



// const { Worker } = require('worker_threads');

// const worker = new Worker('./workerpractice.js');

// worker.postMessage(5);

// worker.on('message', reply => {
//     console.log("Worker says:", reply);
// });


// const { Worker } = require('worker_threads');

// const shared = new SharedArrayBuffer(4);  
// const arr = new Int32Array(shared);

// const worker = new Worker('./workerpractice.js', {
//     workerData: shared
// });

// worker.on('exit', () => {
//     console.log("Final value:", arr[0]);
// });



// const Pool = require('./pool');

// const pool = new Pool('./workerpractice.js');

// (async function() {
//     console.log(await pool.runJob(7));
//     console.log(await pool.runJob(10));
//     console.log(await pool.runJob(10));
// })();

// const { Worker } = require('worker_threads');

// console.log("Main thread started");

// const worker = new Worker('./workerpractice.js');

// worker.on('message', msg => {
//     console.log("Result from worker:", msg);
// });
// worker.on('error', err => {
//     console.log("Worker Error:", err.message);
// });

// worker.on('exit', code => {
//     console.log("Worker exited with code:", code);
// });


const {Worker}=require("worker_threads")

const worker=new Worker("./workerpractice.js");

worker.on('message',msg=>{
    console.log("Results from worker:",msg);
});

worker.on('exit',code=>{
    console.log("Worker exited with code",code);
})
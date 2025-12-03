// const { parentPort } = require('worker_threads');

// let sum = 0;
// for (let i = 0; i < 10; i++) sum += i;

// parentPort.postMessage(sum);


// const { workerData, parentPort } = require('worker_threads');

// let sum = 0;
// for (let i = 0; i < workerData.limit; i++) {
//     sum += i;
// }

// parentPort.postMessage(sum);


// const { parentPort } = require('worker_threads');

// parentPort.on('message', (num) => {
//     parentPort.postMessage(num * num);
//     parentPort.close(); 
// });


// const { workerData } = require('worker_threads');

// const arr = new Int32Array(workerData);

// for (let i = 0; i < 10; i++) {
//     Atomics.add(arr, 0, 1);
// }


// const { parentPort } = require('worker_threads');

// parentPort.on('message', n => {
//     let sum = 0;
//     for (let i = 0; i < n; i++) sum += i;
//     parentPort.postMessage(sum);

// });

const {parentPort}=require('worker_threads')

let sum=0;
for(let i=0;i<11;i++)sum+=i;

parent.postMessage(sum);
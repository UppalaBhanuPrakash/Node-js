const { Worker } = require('worker_threads');
const os = require('os');

const CPU_COUNT = os.cpus().length;

class WorkerPool {
    constructor(workerPath, size = CPU_COUNT) {
        this.size = size;
        this.workers = [];
        this.idle = [];

        for (let i = 0; i < size; i++) {
            const worker = new Worker(workerPath);
            worker.on('message', () => this.idle.push(worker));
            this.workers.push(worker);
            this.idle.push(worker);
        }
    }

    runJob(data) {
        return new Promise(resolve => {
            const worker = this.idle.pop();

            worker.once('message', result => resolve(result));

            worker.postMessage(data);
        });
    }
}

module.exports = WorkerPool;

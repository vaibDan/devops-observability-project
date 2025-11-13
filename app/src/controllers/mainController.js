
// Application routes

const getRoot = ('/', (req, res) => {
    console.log(JSON.stringify({
        level: 'info',
        message: 'Request to / endpoint',
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    }));
    res.send('Hello, Devops World!');
});

// Health check route
const getHealth = ('/health', (req, res) => {
    const healthStatus = {
        status: 'UP',
        timestamp: new Date()
    };
    console.log(JSON.stringify({
        level: 'info',
        message: 'Health check performed',
        status: healthStatus.status
    }));
    res.status(200).json(healthStatus);
});

// Simulated processing route
const getProcess = ('/process', (req, res) => {
    const success = Math.random() > 0.3; // 70% chance of success
    if (success) {
        console.log(JSON.stringify({ level: 'info', message: 'Processing successful', path: req.path }));
        res.status(200).send('Processing Successful!');
    } else {
        console.log(JSON.stringify({ level: 'error', message: 'Processing failed', path: req.path }));
        res.status(500).send('Processing Failed!');
    }
});


module.exports = {
    getRoot,
    getHealth,
    getProcess
};
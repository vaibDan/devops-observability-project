const express = require('express');
const client = require('prom-client');

const app = express();
const port = process.env.PORT || 3000;


// Create a Registry to register the metrics
const register = new client.Registry();
client.collectDefaultMetrics({register});

// create a custom counter metric
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register],
});


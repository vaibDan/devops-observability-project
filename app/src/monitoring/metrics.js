const client = require('prom-client');

// Create a Registry to register the metrics
const register = new client.Registry();

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Set a default label for all metrics
register.setDefaultLabels({
    app: 'nodejs_observed_app'
});

// 1. create a custom counter metric
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register],
});

// 2. HTTP Request Duration Histogram (NEW)
const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    // buckets for response time from 100ms to 2000ms
    buckets: [0.1, 5, 15, 30, 50, 100, 200, 300, 400, 500, 750,],
    registers: [register],
});

// 3. create a custom gauge metric
const activeRequestsGauge = new client.Gauge({
    name: 'active_http_requests',
    help: 'Number of active HTTP requests currently being processed',
    labelNames: ['method', 'route'],
    registers: [register], // ensure it’s visible at /metrics
});

module.exports = {
    register,
    httpRequestCounter,
    activeRequestsGauge,
    httpRequestDurationMicroseconds
};
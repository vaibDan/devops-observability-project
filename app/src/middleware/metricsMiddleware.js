const responseTime = require('response-time');
const express = require('express')
const app = express();
const { httpRequestCounter, activeRequestsGauge, httpRequestDurationMicroseconds } = require('../monitoring/metrics');

app.use(responseTime());


// Middleware to count requests
const requestCounterMiddleware = (req, res, next) => {
    if (req.path !== '/metrics') {
        activeRequestsGauge.inc();
        const startTime = Date.now();
        const endTime = Date.now();
        const duration = endTime - startTime;

        res.on('finish', () => {
            console.log(`Request took ${duration}ms`);

            // Increment request counter
            httpRequestCounter.inc({
                method: req.method,
                route: req.route ? req.route.path : req.path,
                status_code: res.statusCode
            });
            activeRequestsGauge.dec();
        });
    }
    next();
}

// Middleware to measure request duration (Histogram)
const responseTimeMiddleware = responseTime((req, res, time) => {
    console.log(`Histogram observation: method=${req.method}, route=${req.path}, code=${res.statusCode}, time=${time / 1000}`);
    if (req.path) {
        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.path,
            code: res.statusCode
        }, time / 1000); // convert to seconds
    }
});


module.exports = {
    requestCounterMiddleware,
    responseTimeMiddleware
};
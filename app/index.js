const express = require('express');
const { register } = require('./src/monitoring/metrics');
const { requestCounterMiddleware, responseTimeMiddleware } = require('./src/middleware/metricsMiddleware');
const mainRoutes = require('./src/routes/mainRoutes');

const app = express();
const port = process.env.PORT || 3000

// --- Middleware Setup ---
app.use(requestCounterMiddleware);
app.use(responseTimeMiddleware);

// --- Routes Setup ---
app.use('/', mainRoutes);

// Metrics exposure route
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
        console.error('Error collecting metrics:', ex);
    }
});

// --- Server Initialization ---
app.listen(port, () => {
    console.log(JSON.stringify({ level: 'info', message: `Server running on http://localhost:${port}` }));
})
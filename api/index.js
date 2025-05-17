// Main API entry point for Vercel serverless functions
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import individual handlers
const alexanderHandler = require('./alexander');
const cottonHandler = require('./cotton');
const mathildaHandler = require('./mathilda');
const augustHandler = require('./august');

const app = express();

// Enable CORS for all routes
app.use(cors({
	origin: '*',
	methods: ['GET'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));

// Static file serving for local development
if (process.env.NODE_ENV !== 'production') {
	// Serve static files from the root directory
	app.use(express.static(path.join(__dirname, '..')));
	console.log('Serving static files from:', path.join(__dirname, '..'));
}

// Create routes for each restaurant
app.get('/api/alexander', alexanderHandler);
app.get('/api/cotton', cottonHandler);
app.get('/api/mathilda', mathildaHandler);
app.get('/api/august', augustHandler);

// Health check route
app.get('/api/health', (req, res) => {
	res.json({ 
		status: 'OK', 
		timestamp: new Date().toISOString(),
		version: require('../package.json').version,
		environment: process.env.NODE_ENV || 'development'
	});
});

// For local development only - catch-all route to serve index.html
if (process.env.NODE_ENV !== 'production') {
	app.get('*', (req, res) => {
		// Don't serve index.html for API routes
		if (req.path.startsWith('/api/')) {
		return res.status(404).json({ error: 'API endpoint not found' });
		}
		res.sendFile(path.join(__dirname, '..', 'index.html'));
	});
}

// Export the Express API for Vercel
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

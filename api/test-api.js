// Test script for Vaasa Lunch API endpoints
const axios = require('axios');

// Base URL - change this to your deployed URL when testing production
const BASE_URL = process.env.API_URL || 'http://localhost:3000';

// Test function for a single endpoint
async function testEndpoint(endpoint) {
	try {
		console.log(`Testing ${endpoint}...`);
		const startTime = Date.now();
		
		const response = await axios.get(`${BASE_URL}${endpoint}`, {
		timeout: 10000
	});
	
	const endTime = Date.now();
	const duration = endTime - startTime;
	
	console.log(`✅ ${endpoint} - Status: ${response.status} - Time: ${duration}ms`);
	
	// Check if data is present
	if (response.data && response.data.data) {
		// Check if the data contains actual menu content
		const data = response.data.data;
		const hasMenuContent = typeof data === 'string' && 
							(data.includes('<ul>') || 
								data.includes('lunch-menu') || 
								data.includes('menu-item'));
		if (hasMenuContent) {
			console.log(`Data contains menu content (${data.length} bytes)`);
		} else {
			console.log(`⚠️ Data may not contain menu content`);
		}
	} else {
		console.log(`❌ No data received`);
	}
	
	return true;
} catch (error) {
	console.error(`❌ ${endpoint} - ERROR: ${error.message}`);
	if (error.response) {
		console.error(`   Status: ${error.response.status}`);
		console.error(`   Data: ${JSON.stringify(error.response.data)}`);
	}
	return false;
  }
}

// Run all tests
async function runTests() {
	console.log(`🔍 Testing API endpoints at ${BASE_URL}`);
	console.log('=========================================');

	const endpoints = [
		'/api/health',
		'/api/alexander',
		'/api/cotton',
		'/api/mathilda',
		'/api/august'
	];
	
	let successCount = 0;
	
	for (const endpoint of endpoints) {
		const success = await testEndpoint(endpoint);
		if (success) successCount++;
		console.log('-----------------------------------------');
	}

	console.log(`Test results: ${successCount}/${endpoints.length} endpoints working`);
}

// Run the tests
runTests().catch(error => {
	console.error('Test runner error:', error);
	process.exit(1);
});

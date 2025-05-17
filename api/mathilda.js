/**
 * API handler for Mathilda & Café Oskar restaurant menu
 */
const axios = require('axios');

// Cache object
const cache = {
	data: null,
	expiry: 0
};

const CACHE_DURATION = 3600000;

module.exports = async (req, res) => {
	try {
		// Check cache first
		if (cache.data && cache.expiry > Date.now()) {
		return res.json({ data: cache.data });
		}
		
		// Fetch fresh data
		const response = await axios.get('https://www.lounaat.info/lounas/food-co-mathilda-cafe-oskar/vaasa', {
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Language': 'en-US,en;q=0.5',
		},
		timeout: 8000,
		});
		
		// Update cache
		cache.data = response.data;
		cache.expiry = Date.now() + CACHE_DURATION;
		
		res.json({ data: response.data });
	} catch (error) {
		console.error('Mathilda API error:', error.message);
		res.status(500).json({ 
		error: 'Failed to fetch Mathilda menu', 
		message: error.message 
		});
	}
};

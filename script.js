// Icons for themes
const default_icon = `<svg class="MuiSvgIcon-root" width="25" height="25" fill="currentColor" id="theme-toggler" onclick="toggleTheme()" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path></svg>`;
const dark_icon = `<svg class="MuiSvgIcon-root" width="25" height="25" fill="currentColor" id="theme-toggler" onclick="toggleTheme()" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path></svg>`;

// Set the current date in localStorage
const date = new Date();
localStorage.setItem('currentDate', date.toISOString());

// Element for theme toggle
const togglerdiv = document.querySelector('#toggler-div');

// Get the user's preferred language
let chosenLang = localStorage.getItem('selected-language');
if (chosenLang === null) {
	chosenLang = 'en';
	localStorage.setItem('selected-language', 'en');
};

if (chosenLang === 'en') {
	document.querySelector('#lunchline').innerHTML = 'All your most important (Vaasa) lunch menus in one place.';
	document.querySelector('#lang-btn').innerHTML = 'Language';
	document.querySelectorAll('.lang-reminder').innerHTML = 'Not all menus are translated';
	document.querySelector('#copy-text').innerHTML = 'Copy lunch menu';
} else if (chosenLang === 'sv-FI') {
	document.querySelector('#lunchline').innerHTML = 'Alla dina viktigaste (Vasa) lunchmenyer på ett ställe.';
	document.querySelector('#lang-btn').innerHTML = 'Språk';
	document.querySelectorAll('.lang-reminder').innerHTML = 'Alla menyer är inte översatta';
	document.querySelector('#copy-text').innerHTML = 'Kopiera lunchlistorna';
} else {
	document.querySelector('#lunchline').innerHTML = 'Kaikki (Vaasan) tärkeimmät lounaslistat yhdessä paikassa.';
	document.querySelector('#lang-btn').innerHTML = 'Kieli';
	document.querySelectorAll('.lang-reminder').innerHTML = 'Kaikkia lounaslistoja ei ole käännetty';
	document.querySelector('#copy-text').innerHTML = 'Kopioi lounaslistat';
};

// Function to set language
const setLanguage = () => {
	const dropdownItems = document.querySelectorAll('.dropdown-item');

	// First, remove 'selected' class from all dropdown items
	dropdownItems.forEach(item => {
		item.classList.remove('selected');
	});
	
	// Get the stored language
	const storedLang = localStorage.getItem('selected-language');
	
	// Add 'selected' class to the current language item
	dropdownItems.forEach(item => {
		if (item.getAttribute('data-lang') === storedLang) {
			item.classList.add('selected');
		}
	});
	
	dropdownItems.forEach(item => {
		item.addEventListener('click', function (event) {
			event.preventDefault();
			const lang = this.getAttribute('data-lang');
			
			// Remove 'selected' class from all items and add to the clicked one
			dropdownItems.forEach(item => item.classList.remove('selected'));
			this.classList.add('selected');
			
			if (lang === 'en') {
				document.querySelector('#lunchline').innerHTML = 'All your most important (Vaasa) lunch menus in one place.';
				document.querySelector('#lang-btn').innerHTML = 'Language';
				document.querySelectorAll('.lang-reminder').innerHTML = 'Not all menus are translated';
				document.querySelector('#copy-text').innerHTML = 'Copy lunch menu';
			} else if (lang === 'sv-FI') {
				document.querySelector('#lunchline').innerHTML = 'Alla dina viktigaste (Vasa) lunchmenyer på ett ställe.';
				document.querySelector('#lang-btn').innerHTML = 'Språk';
				document.querySelectorAll('.lang-reminder').innerHTML = 'Alla menyer är inte översatta';
				document.querySelector('#copy-text').innerHTML = 'Kopiera lunchlistorna';
			} else {
				document.querySelector('#lunchline').innerHTML = 'Kaikki (Vaasan) tärkeimmät lounaslistat yhdessä paikassa.';
				document.querySelector('#lang-btn').innerHTML = 'Kieli';
				document.querySelectorAll('.lang-reminder').innerHTML = 'Kaikkia lounaslistoja ei ole käännetty';
				document.querySelector('#copy-text').innerHTML = 'Kopioi lounaslistat';
			};
			localStorage.setItem('selected-language', lang);
			
			// Reload all menus
			fetchLunch(`https://abo-academi.ravintolapalvelut.iss.fi/abo-academi`, 'alexander-menu');
			fetchLunch(`https://www.lounaat.info/lounas/cotton-club/vaasa`, 'cotton-menu');
			fetchLunch(`https://www.lounaat.info/lounas/food-co-mathilda-cafe-oskar/vaasa`, 'mathilda-menu');
			fetchLunch(`https://www.lounaat.info/lounas/august-restaurant/vaasa`, 'august-menu');
			
		});
	});
};

// Function to set the theme icon and data-bs-theme attribute based on user preference or stored theme
const checkTheme = () => {
	try {
		if (localStorage.getItem('website_theme') === 'dark_mode') {
			togglerdiv.innerHTML = dark_icon;
			document.documentElement.setAttribute('data-bs-theme', 'dark');
		} else {
			togglerdiv.innerHTML = default_icon;
			document.documentElement.setAttribute('data-bs-theme', 'light');
		}
	} catch (error) {
		outputError(error.message + ` (${error.stack})`);
		console.log(error.message);
	}
};

// Call the function to set initial theme icon and data-bs-theme attribute
checkTheme();

// Function for toggling theme
const toggleTheme = () => {
	try {
		if (localStorage.getItem('website_theme') === 'dark_mode') {
			localStorage.setItem('website_theme', 'default');
		} else {
			localStorage.setItem('website_theme', 'dark_mode');
		}
		checkTheme(); // Update the theme icon and data-bs-theme attribute
	} catch (error) {
		outputError(error.message + ` (${error.stack})`);
		console.log(error.message);
	}
};

// Check if theme is set and set theme based on stored preference
const getTheme = () => {
	try {
		let theme = localStorage.getItem('website_theme');
		if (theme != null) {
			checkTheme(); // Update the theme icon and data-bs-theme attribute
		}
	} catch (error) {
		outputError(error.message + ` (${error.stack})`);
		console.log(error.message);
	}
};
getTheme();

// Function to initialize the date
let currentDate;

function initializeDate() {
	try {
		const savedDate = localStorage.getItem('currentDate');
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (savedDate) {
			currentDate = new Date(savedDate);
			currentDate.setHours(0, 0, 0, 0);
		} else {
			currentDate = new Date();
			localStorage.setItem('currentDate', currentDate.toISOString());
		}

		updateDate();
	} catch (error) {
		outputError(error.message + ` (${error.stack})`);
		console.log(error.message);
	}
};

function updateDate() {
	try {
		// Get today's date for comparison
		const today = new Date();
		const todayDay = String(today.getDate()).padStart(2, '0');
		const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
		const todayYear = String(today.getFullYear()).substring(2, 4);

		// Format the current date to DD.MM.YY
		const day = String(currentDate.getDate()).padStart(2, '0');
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const year = String(currentDate.getFullYear()).substring(2, 4);

		// Check if the current date is today
		const isToday = (day === todayDay && month === todayMonth && year === todayYear);

		// Update the DOM
		let dayHTML = isToday ? `<span class="text-secondary">${day}</span>` : day;
		document.querySelector('.currentDate').innerHTML = `<i class="bi bi-arrow-left date-selector date-previous" onclick="changeDay(-1)"></i> ${dayHTML}.${month}.${year} <i class="bi bi-arrow-right date-selector date-next" onclick="changeDay(1)"></i>`;

		// Save the new date in localStorage
		localStorage.setItem('currentDate', currentDate.toISOString());
	} catch (error) {
		outputError(error.message + ` (${error.stack})`);
		console.log(error.message);
	}
};

let isFetching = false;

async function changeDay(delta) {
	if (isFetching) {
		return; // Ignore clicks if already fetching
	}

	isFetching = true;

	try {
		// Change the date by adding/subtracting days
		currentDate.setDate(currentDate.getDate() + delta);

		// Update the date in DOM and localStorage
		updateDate();

		// Await for all fetches to complete
		await Promise.all([
			fetchLunch(`https://abo-academi.ravintolapalvelut.iss.fi/abo-academi`, 'alexander-menu'),
			fetchLunch(`https://www.lounaat.info/lounas/cotton-club/vaasa`, 'cotton-menu'),
			fetchLunch(`https://www.lounaat.info/lounas/food-co-mathilda-cafe-oskar/vaasa`, 'mathilda-menu'),
			fetchLunch(`https://www.lounaat.info/lounas/august-restaurant/vaasa`, 'august-menu')
		]);
	} catch (error) {
		outputError(error.message + ` (${error.stack})`);
		console.log(error.message);
	} finally {
		isFetching = false;
	}
};

// Initialize the date when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
	initializeDate();
	setLanguage(); // Apply selected class on page load
});

// Log result to application log
const outputError = (input) => {
	try {
		document.querySelector("#errorMsg").innerHTML += `<div class="alert alert-danger mt-1 mb-3" role="alert">${input}</div`;
	} catch (error) {
		outputError(error.message + ` (${error.stack})`);
		console.log(error.message);
	}
};

// List of CORS proxies to try
const corsProxies = [
	'https://api.cors.lol/?url=',
];

let fullURL;

function getLunchTime(data, divId) {
	// Different restaurants have different formats for their lunch times
	try {
		if (divId === 'alexander-menu') {
			// Alexander format: "Lunch: 11:00 - 14:00"
			const regex = /Lunch:\s*(\d{2}:\d{2}\s*-\s*\d{2}:\d{2})/;
			const match = data.match(regex);
			return match ? match[1] : "11:00 - 14:00"; // Default if no match found
		} else {
			// For lounaat.info style restaurants (Cotton Club, Mathilda, August)
			const metaMatch = data.match(/<meta itemprop="openingHours" content="([^"]*)" \/>([^<]*)/);
			if (metaMatch) {
				// First try to extract from meta tag if present
				const hours = metaMatch[2].trim();
				// Clean up the hours - remove day prefixes (ma-pe:, ma-to:, etc) and trailing commas
				return hours.replace(/[a-zåäö\-]+:\s*/i, "").replace(/,\s*$/, "");
			} else {
				// Fallback - try to find in general content
				const generalMatch = data.match(/ma-pe:\s*(\d{1,2}[:.-]\d{1,2}[-–]\d{1,2}[:.-]\d{1,2})/);
				return generalMatch ? generalMatch[1] : "11-14"; // Default hours
			}
		}
	} catch (error) {
		console.error("Error parsing lunch time:", error);
		return "11-14"; // Default fallback
	}
}

// Function to attempt fetching with multiple proxies
async function fetchWithProxies(URL) {
	let lastError = null;
	
	// Try each proxy in sequence
	for (let proxy of corsProxies) {
		try {
			const fullURL = proxy ? proxy + encodeURIComponent(URL) : URL;
			console.log(`Trying to fetch with: ${proxy || 'direct fetch'}`);
			
			const response = await fetch(fullURL, {
				method: 'GET',
				headers: {
					'Content-Type': 'text/html; charset=utf-8',
					'Origin': window.location.origin,
				},
				// Add a reasonable timeout
				signal: AbortSignal.timeout(10000) // 10 seconds timeout
			});
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			return await response.text();
		} catch (error) {
			console.log(`${proxy || 'Direct fetch'} failed: ${error.message}`);
			lastError = error;
			// Continue to the next proxy
		}
	}
	
	// If we've tried all proxies and none worked, throw the last error
	throw new Error(`All methods failed to fetch data. Last error: ${lastError?.message || 'Unknown error'}`);
}

// Function to fetch and display the lunch for all restaurants
async function fetchLunch(URL, divId) {
	try {
		// Get the div where you want to display the data and the user's preferred language
		const lang = localStorage.getItem('selected-language');
		const lunchDiv = document.getElementById(divId);

		// Set the innerHTML to "Fetching data" before fetching
		if (lang === 'en') {
			lunchDiv.innerHTML = "<p>Fetching lunch data...</p>";
		} else if (lang === 'sv-FI') {
			lunchDiv.innerHTML = "<p>Hämtar lunch-data...</p>";
		} else {
			lunchDiv.innerHTML = "<p>Noudetaan lounas-dataa...</p>";
		}

		// Try to fetch with multiple proxies
		const data = await fetchWithProxies(URL);
		
		// Get reminder notes div
		const reminderNotes = document.querySelectorAll('.lang-reminder');
		lunchDiv.innerHTML = '';

		// Get the updated preferred language
		let openTxt;
		let menuLinkTxt;
		let restaurantUrl = URL;

		reminderNotes.forEach((reminderNote) => {
			if (lang === 'en') {
				reminderNote.innerHTML = 'Not all menus are translated';
			} else if (lang === 'sv-FI') {
				reminderNote.innerHTML = 'Alla menyer är inte översatta';
			} else {
				reminderNote.innerHTML = 'Kaikkia lounaslistoja ei ole käännetty';
			}
		});

		let storedDateString = localStorage.getItem('currentDate');
		let storedDate = new Date(storedDateString);
		let today = new Date();

		// Normalize the Date objects to compare only the date, not the time
		let isToday = today.toDateString() === storedDate.toDateString();

		if (lang === 'en') {
			openTxt = isToday ? 'Open today:' : 'Open:';
			menuLinkTxt = 'Menu link';
		} else if (lang === 'sv-FI') {
			openTxt = isToday ? 'Öppet idag:' : 'Öppet:';
			menuLinkTxt = 'Full meny';
		} else {
			openTxt = isToday ? 'Auki tänään:' : 'Avoinna:';
			menuLinkTxt = 'Menu';
		}

		// Initialize the date when the page loads or read it from localStorage
		initializeDate();

		// Convert currentDate to format needed for the regex
		const originalDate = new Date(currentDate);
		// Getting the date components in local time
		const mm = String(originalDate.getMonth() + 1);  // Months are zero-based
		const dd = String(originalDate.getDate());
		// Constructing the new date string
		const dateFormatted = `${dd}.${mm}`;

		// Get the lunch time
		let lunchTime = getLunchTime(data, divId);

		// Find current weekday
		const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const day = daysOfWeek[currentDate.getDay()];
		const isWeekend = (day === 'Sat' || day === 'Sun');

		if (isWeekend) {
		  if (lang === 'en') {
			lunchDiv.innerHTML = '<p>No lunch service on weekends.</p>';
		  } else if (lang === 'sv-FI') {
			lunchDiv.innerHTML = '<p>Ingen lunchservice under helgen.</p>';
		  } else {
			lunchDiv.innerHTML = '<p>Ei lounaspalvelua viikonloppuisin.</p>';
		  }
		  return;
		}

		// Create a regex to find today's date and its associated menu
		let match;
		let menuItems = [];

		if (divId === 'alexander-menu') {
			// Alexander restaurant format - try multiple patterns for more robustness
			
			// Try multiple date formats and patterns
			const regexPatterns = [
				// Standard pattern with full match
				new RegExp(`<div class="lunch-menu__day[^>]*>\\s*<span class="day-toggle"></span><h2 class="collapsible-title">[^<]*${dateFormatted}[^<]*</h2>\\s*<p>(.*?)</p>`, 's'),
				// Alternative pattern - just look for the date and paragraphs that follow
				new RegExp(`<h2 class="collapsible-title">[^<]*${dateFormatted}[^<]*</h2>\\s*<p>(.*?)</p>`, 's'),
				// More flexible pattern - look for date anywhere in a header followed by content
				new RegExp(`<h\\d[^>]*>[^<]*${dateFormatted}[^<]*</h\\d>\\s*<p>(.*?)</p>`, 's')
			];
			
			// Try each pattern until we find a match
			for (const pattern of regexPatterns) {
				match = data.match(pattern);
				if (match && match[1]) {
					menuItems = parseAlexanderMenu(match[1]);
					break;
				}
			}
			
			// If still no match, try to extract any menu content
			if (menuItems.length === 0) {
				const anyMenuPattern = /<div class="lunch-menu__day[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>/g;
				const allMatches = [...data.matchAll(anyMenuPattern)];
				
				// Find the closest date - any menu is better than no menu
				for (const menuMatch of allMatches) {
					if (menuMatch[1] && !menuMatch[1].includes('Sale of leftover food')) {
						menuItems = parseAlexanderMenu(menuMatch[1]);
						break;
					}
				}
			}
		} else {
			// Lounaat.info format (Cotton Club, Mathilda, August)
			const regex = new RegExp(`<div class="item-header"><h3>[^<]*${dateFormatted}[^<]*</h3></div><div class="item-body"><ul>(.*?)</ul></div><div class="item-footer">`, 's');
			match = data.match(regex);
			if (match && match[1]) {
				menuItems = parseLounaatInfoMenu(match[1]);
			}
		}

		if (menuItems.length > 0) {
			const lunchTimeElement = document.createElement('div');
			
			// Generate the restaurant-specific header with open hours and menu link
			lunchTimeElement.innerHTML = `<div class="row d-flex justify-content-between">
				<div class="col-8">
					<p class="openTxt"><b>${openTxt}</b><span class="text-success"> ${lunchTime}</span></p>
				</div>
				<div class="col-4 d-flex justify-content-end">
					<a style="text-decoration: none;" class="menu-link" href="${restaurantUrl}">${menuLinkTxt}
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
							class="bi bi-box-arrow-up-right mb-1 ml-1" viewBox="0 0 16 16">
							<path fill-rule="evenodd"
								d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
							<path fill-rule="evenodd"
								d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
						</svg>
					</a>
				</div>
			</div>`;
			
			lunchDiv.appendChild(lunchTimeElement);

			const menuParagraph = document.createElement('div');
			menuParagraph.innerHTML = "<b>Lunch/lounas</b>:";
			const menuList = document.createElement('ul');
			menuList.style.paddingLeft = '20px';
			menuList.style.marginTop = '8px';

			menuItems.forEach(item => {
				const li = document.createElement('li');
				li.innerHTML = item;
				// Add text wrapping styles to list items
				li.style.wordWrap = 'break-word';
				li.style.overflowWrap = 'break-word';
				li.style.whiteSpace = 'normal';
				li.style.maxWidth = '100%';
				menuList.appendChild(li);
			});

			menuParagraph.appendChild(menuList);
			lunchDiv.appendChild(menuParagraph);

		} else {
			if (lang === 'en') {
				lunchDiv.innerHTML = '<p>No lunch data available for the selected day.</p>';
			} else if (lang === 'sv-FI') {
				lunchDiv.innerHTML = '<p>Ingen lunch-data kunde hämtas för dagen i frågan.</p>';
			} else {
				lunchDiv.innerHTML = '<p>Lounas-dataa ei löytynyt kyseiselle päivälle.</p>';
			}
		}

	} catch (error) {
		const lang = localStorage.getItem('selected-language') || 'en';
		const lunchDiv = document.getElementById(divId);

		if (lang === 'en') {
			lunchDiv.innerHTML = '<p>Failed to fetch lunch data. Please try again later.</p>';
		} else if (lang === 'sv-FI') {
			lunchDiv.innerHTML = '<p>Kunde inte hämta lunch data. Försök igen senare.</p>';
		} else {
			lunchDiv.innerHTML = '<p>Lounas-datan noutaminen epäonnistui. Yritä myöhemmin uudelleen.</p>';
		}
		outputError(error.message + ` (${error.stack})`);
		console.error('An error occurred:', error);
	}
};

const copyLunchToClipboard = () => {
	try {
		const lang = localStorage.getItem('selected-language') || 'en';
		const trimmedDate = document.querySelector('.currentDate').innerText.trim().replace(/^(0?)(\d{1,2})\.(0?)(\d{1,2})\.\d{2}$/, "$2.$4");
		
		let heading;
		if (lang === 'en') {
			heading = 'Today\'s lunch (' + trimmedDate + '):';
		} else if (lang === 'sv-FI') {
			heading = 'Dagens lunch (' + trimmedDate + '):';
		} else {
			heading = 'Päivän lounas (' + trimmedDate + '):';
		}

		// Function to extract menu items from a restaurant section
		const extractMenuItems = (menuElement) => {
			// Check if there's an error message or no data
			const menuText = menuElement.innerText;
			if (menuText.includes('Failed to fetch') || menuText.includes('No lunch') || menuText.includes('Fetching')) {
				return 'No menu available';
			}
			
			// Get all list items if available
			const listItems = menuElement.querySelectorAll('ul li');
			if (listItems.length > 0) {
				return Array.from(listItems)
					.map(item => item.innerText.trim())
					.filter(item => item && !item.includes('Open') && !item.includes('Auki') && !item.includes('Öppet'))
					.join(', ');
			} else {
				// Fallback if no list items found
				// Extract text content between the opening hours section and any next section
				const menuContent = menuText
					.split(/Open:|Auki:|Öppet:/)[1]   // Get content after opening hours
					.split(/Lunch\/lounas:|Menu link|Full meny|Menu/)[0]  // Stop at menu link section
					.trim();
					
				return menuContent || 'No menu items found';
			}
		};

		// Extract menu items from each restaurant
		const alexanderItems = extractMenuItems(document.getElementById('alexander-menu'));
		const cottonItems = extractMenuItems(document.getElementById('cotton-menu'));
		const mathildaItems = extractMenuItems(document.getElementById('mathilda-menu'));
		const augustItems = extractMenuItems(document.getElementById('august-menu'));

		// Construct the lunch object with all four restaurants
		const lunchObj = `${heading}\n\n\u{1F4CD}Ravintola Alexander: ${alexanderItems}\n\n\u{1F4CD}Cotton Club: ${cottonItems}\n\n\u{1F4CD}Mathilda & Café Oskar: ${mathildaItems}\n\n\u{1F4CD}August Restaurant: ${augustItems}`;

		// Copy the lunch object to the clipboard
		navigator.clipboard.writeText(lunchObj);
		
		console.log("Lunch menu copied to clipboard");
	} catch (error) {
		outputError(error.message + ` (${error.stack})`);
		console.error('An error occurred:', error);
	}
};

document.querySelector('#collapseTwo').addEventListener('show.bs.collapse', function () {
	fetchLunch(`https://abo-academi.ravintolapalvelut.iss.fi/abo-academi`, 'alexander-menu');
});

document.querySelector('#collapseOne').addEventListener('show.bs.collapse', function () {
	fetchLunch(`https://www.lounaat.info/lounas/cotton-club/vaasa`, 'cotton-menu');
});

document.querySelector('#collapseThree').addEventListener('show.bs.collapse', function () {
	fetchLunch(`https://www.lounaat.info/lounas/food-co-mathilda-cafe-oskar/vaasa`, 'mathilda-menu');
});

document.querySelector('#collapseFour').addEventListener('show.bs.collapse', function () {
	fetchLunch(`https://www.lounaat.info/lounas/food-co-mathilda-cafe-oskar/vaasa`, 'mathilda-menu');
});

document.getElementById('copy-div').addEventListener('click', function () {
	this.classList.add('animated');

	copyLunchToClipboard();

	this.addEventListener('animationend', function () {
		this.classList.remove('animated');
	});
});

// Call the async function to fetch and display the food menu
fetchLunch(`https://abo-academi.ravintolapalvelut.iss.fi/abo-academi`, 'alexander-menu'),
fetchLunch(`https://www.lounaat.info/lounas/cotton-club/vaasa`, 'cotton-menu'),
fetchLunch(`https://www.lounaat.info/lounas/food-co-mathilda-cafe-oskar/vaasa`, 'mathilda-menu'),
fetchLunch(`https://www.lounaat.info/lounas/august-restaurant/vaasa`, 'august-menu')

// Function to standardize text formatting while preserving number formats
function standardizeFormatting(text) {
	return text
		.replace(/,(?!\s)(?!\d)/g, ', ')  // Add space after comma if missing, but not in numbers
		.replace(/(?<!\d),(?=\d)/g, ',')  // Ensure no space is added in numbers like 3,50€
		.replace(/(\S)\+(\S)/g, '$1 + $2') // Add space before and after + between words
		.replace(/\s+/g, ' ')        // Normalize multiple spaces
		.trim();
}

// Function to parse Alexander restaurant menu format
function parseAlexanderMenu(menuText) {
	// Clean up the menu items (remove allergens, etc.)
	const items = menuText.split('<br>').map(item => item.trim())
		.filter(item => item && !item.includes('Sale of leftover food'));
	
	return items.map(item => {
		// Clean the text of formatting but keep the dish description
		const cleanedText = standardizeFormatting(item
			.replace(/\s*\b([L|G|M|S|VL|V]\/)*[L|G|M|S|VL|V](\b\s*)/g, '')  // Remove L/G etc.
			.replace(/\*,?\s*/g, '')  // Remove asterisks
			.replace(/\s*\(.+?\)\s*/g, '') // Remove anything in parentheses
			.trim());
		
		// Return the formatted text with no allergens
		return capitalizeFirstLetter(cleanedText);
	});
}

// Function to parse lounaat.info format menus (Cotton Club, Mathilda, August)
function parseLounaatInfoMenu(menuText) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(menuText, 'text/html');
	const menuItems = [];
	
	// First try a more specific approach for Mathilda's unique format
	const menuItemElements = doc.querySelectorAll('.menu-item');
	if (menuText.includes('café oskarissa') || menuText.includes('mathilda')) {
		// Mathilda-specific parsing
		menuItemElements.forEach(menuItem => {
			const dishElement = menuItem.querySelector('.dish');
			const infoElement = menuItem.querySelector('.info');
			
			if (dishElement && infoElement) {
				// Get the category name
				let category = dishElement.textContent.trim();
				
				// Extract the dish descriptions
				const dishDescriptions = [];
				
				// Process the info HTML to get dish descriptions
				const tempDiv = document.createElement('div');
				tempDiv.innerHTML = infoElement.innerHTML.replace(/<br\s*\/?>/gi, '|||');
				
				// Split by our custom separator
				const infoTexts = tempDiv.textContent.split('|||');
				
				// Process each part
				infoTexts.forEach(info => {
					const cleanInfo = info.trim()
						.replace(/\*/g, '')
						.replace(/>/g, '')
						.replace(/,\s*$/, '')
						.replace(/\s*\b([L|G|M|S|VL|V])\b\s*/gi, '') // Remove allergen codes
						.trim();
					
					if (cleanInfo && !cleanInfo.match(/^[\s,.*•]*$/)) {
						dishDescriptions.push(cleanInfo);
					}
				});
				
				// Format the complete menu item without allergens
				if (dishDescriptions.length > 0) {
					const formattedText = capitalizeFirstLetter(category) + ": " +
						dishDescriptions.join('; ');
					menuItems.push(formattedText);
				} else {
					menuItems.push(capitalizeFirstLetter(category));
				}
			}
		});
	}
	
	// If we found menu items specifically for Mathilda, return them
	if (menuItems.length > 0 && (menuText.includes('café oskarissa') || menuText.includes('mathilda'))) {
		return menuItems;
	}
	
	// Otherwise use the general approach for other restaurants
	let menuFound = false;
	
	doc.querySelectorAll('.item').forEach(item => {
		const header = item.querySelector('.item-header h3');
		if (header && !menuFound) {
			const menuItemsList = item.querySelectorAll('.menu-item');
			if (menuItemsList.length > 0 && !item.querySelector('.info')?.textContent.includes('puuttuu')) {
				menuFound = true;
				
				menuItemsList.forEach(menuItem => {
					// Extract dish names directly
					const dishElement = menuItem.querySelector('.dish');
					if (dishElement) {
						// Extract the main text content
						let dishText = dishElement.textContent.trim();

						// Clean up the dish text
						dishText = dishText
							.replace(/<[^>]*>/g, '') // Remove any remaining HTML
							.replace(/\s*\b([L|G|M|S|VL|V])\b\s*/gi, ' ') // Remove allergen codes
							.replace(/\*/g, '') // Remove asterisks
							.replace(/\s+/g, ' ') // Normalize spaces
							.trim();

						// Add the clean dish without allergens
						if (dishText) {
							menuItems.push(capitalizeFirstLetter(dishText));
						}
					}
				});
			}
		}
	});

	// If still no menu items found, try the generic fallback approach
	if (menuItems.length === 0) {
		doc.querySelectorAll('.menu-item').forEach(menuItemElement => {
			const dishElement = menuItemElement.querySelector('.dish');
			if (dishElement) {
				let category = dishElement.textContent.trim();
				
				// Clean and format the dish text
				let dishText = category
					.replace(/<[^>]*>/g, '')
					.replace(/\s*\b([L|G|M|S|VL|V])\b\s*/gi, ' ')
					.replace(/\*/g, '')
					.replace(/\s+/g, ' ')
					.trim();
				
				if (dishText) {
					const formattedText = capitalizeFirstLetter(dishText);
					menuItems.push(formattedText);
				}
			}
		});
	}
	
	return menuItems;
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

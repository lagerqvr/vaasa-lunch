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

// JavaScript function to set language
document.addEventListener('DOMContentLoaded', () => {
    setLanguage();
});

if (chosenLang === 'en') {
    document.querySelector('#lunchline').innerHTML = 'One place for all your lunchlist needs.';
    document.querySelector('#lang-btn').innerHTML = 'Language';
    document.querySelectorAll('.lang-reminder').innerHTML = 'Not all menus are translated';
    document.querySelector('#copy-text').innerHTML = 'Copy lunch menu';
} else if (chosenLang === 'sv-FI') {
    document.querySelector('#lunchline').innerHTML = 'En plats för alla dina lunchmenyer.'
    document.querySelector('#lang-btn').innerHTML = 'Språk';
    document.querySelectorAll('.lang-reminder').innerHTML = 'Alla menyer är inte översatta';
    document.querySelector('#copy-text').innerHTML = 'Kopiera lunchlistorna';
} else {
    document.querySelector('#lunchline').innerHTML = 'Kaikki lounaslistat yhdessä paikassa.'
    document.querySelector('#lang-btn').innerHTML = 'Kieli';
    document.querySelectorAll('.lang-reminder').innerHTML = 'Kaikkia lounaslistoja ei ole käännetty';
    document.querySelector('#copy-text').innerHTML = 'Kopioi lounaslistat';
};

// Function to set language
const setLanguage = () => {
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const lang = this.getAttribute('data-lang');

            if (lang === 'en') {
                document.querySelector('#lunchline').innerHTML = 'One place for all your lunchlist needs.';
                document.querySelector('#lang-btn').innerHTML = 'Language';
                document.querySelectorAll('.lang-reminder').innerHTML = 'Not all menus are translated';
                document.querySelector('#copy-text').innerHTML = 'Copy lunch menu';
            } else if (lang === 'sv-FI') {
                document.querySelector('#lunchline').innerHTML = 'En plats för alla dina lunchmenyer.'
                document.querySelector('#lang-btn').innerHTML = 'Språk';
                document.querySelectorAll('.lang-reminder').innerHTML = 'Alla menyer är inte översatta';
                document.querySelector('#copy-text').innerHTML = 'Kopiera lunchlistorna';
            } else {
                document.querySelector('#lunchline').innerHTML = 'Kaikki lounaslistat yhdessä paikassa.'
                document.querySelector('#lang-btn').innerHTML = 'Kieli';
                document.querySelectorAll('.lang-reminder').innerHTML = 'Kaikkia lounaslistoja ei ole käännetty';
                document.querySelector('#copy-text').innerHTML = 'Kopioi lounaslistat';
            }
            localStorage.setItem('selected-language', lang);

            // Reload all menus
            fetchLunch(`https://abo-academi.ravintolapalvelut.iss.fi/abo-academi`, 'alexander-menu');
            fetchLunch(`https://www.lounaat.info/lounas/cotton-club/vaasa`, 'cotton-menu');
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
            fetchLunch(`https://www.lounaat.info/lounas/cotton-club/vaasa`, 'cotton-menu')
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

let fullURL;

function getLunchTime(html, dayOfWeek, divName) {
    let regex;
    if (divName == 'alexander-menu') {
        regex = /Lunch:\s*(\d{2}:\d{2}\s*-\s*\d{2}:\d{2})/;
    } else {
        regex = /Lounas kello \s*(\d{2}:\d{2}\s*-\s*\d{2})/

    }
    const match = html.match(regex);
    console.log(match);
    if (match) {
        const weekLunchTime = match[1];
        const fridayLunchTime = match[2];
        if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Monday to Thursday
            return weekLunchTime;
        } else if (dayOfWeek === 5) { // Friday
            return fridayLunchTime;
        }
    }
    return " - "; // Default if no match found
}

// Function to fetch and display the lunch for the specific day from Arcada, Diak and Artebia 135
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

        // Proxy URL to bypass CORS
        const proxyURL = 'https://corsproxy.io/?'
        fullURL = proxyURL + URL;

        // Fetch the JSON content
        const response = await fetch(fullURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
        });

        // Fetch HTML data
        const data = await response.text();
        console.log(data);

        // Check the status code
        if (response.status === 524) {
            if (lang === 'en') {
                lunchDiv.innerHTML = "Failed to fetch lunch data.";
            } else if (lang === 'sv-FI') {
                lunchDiv.innerHTML = "Kunde inte hämta lunch data.";
            } else {
                lunchDiv.innerHTML = "Lounas-datan noutaminen epäonnistui.";
            }
            return;
        }

        // Get reminder notes div
        const reminderNotes = document.querySelectorAll('.lang-reminder');
        lunchDiv.innerHTML = '';

        // Get the updated preferred language
        let openTxt;
        let menuLinkTxt;

        reminderNotes.forEach((reminderNotes) => {
            if (lang === 'en') {
                reminderNotes.innerHTML = 'Not all menus are translated';
            } else if (lang === 'sv-FI') {
                reminderNotes.innerHTML = 'Alla menyer är inte översatta';
            } else {
                reminderNotes.innerHTML = 'Kaikkia lounaslistoja ei ole käännetty';
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

        // Convert currentDate to the ISO format used by data.MenusForDays
        const originalDateString = currentDate;
        const originalDate = new Date(originalDateString);

        // Getting the date components in local time
        const mm = String(originalDate.getMonth() + 1);  // Months are zero-based
        const dd = String(originalDate.getDate());

        // Constructing the new date string
        const dateFormatted = `${dd}.${mm}`;

        // Extract lunch time from HTML string
        let htmlString;
        let divName;
        if (lunchDiv.id == 'alexander-menu') {
            divName = "alexander-menu"
            htmlString = "Lunch: ";
        } else {
            htmlString = "Lounas kello ";
        }
        const dayOfWeek = today.getDay();
        const lunchTime = getLunchTime(htmlString, dayOfWeek, divName);

        // Create a regex to find today's date and its associated menu
        let match;
        if (lunchDiv.id == 'alexander-menu') {
            const regex = new RegExp(`<div class="lunch-menu__day[^>]*>\\s*<span class="day-toggle"></span><h2 class="collapsible-title">[^<]*${dateFormatted}[^<]*</h2>\\s*<p>(.*?)</p>`, 's');
            match = data.match(regex);
        } else {
            const regex = new RegExp(`<div class="item-header"><h3>[^<]*${dateFormatted}[^<]*</h3></div><div class="item-body"><ul>(.*?)</ul></div><div class="item-footer">`, 's');
            match = data.match(regex);
        }

        console.log(match);

        // Find current weekday
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const day = daysOfWeek[currentDate.getDay()];
        const isWeekend = (day === 'Sat' || day === 'Sun');

        if (match && match[1] && !isWeekend) {
            const lunchTimeElement = document.createElement('div');
            switch (lunchDiv.id) {
                case 'alexander-menu':
                    lunchTimeElement.innerHTML = `<div class="row d-flex justify-content-between">
            <div class="col-8">
                <p class="openTxt"><b>${openTxt}</b><span
                        class="text-success"> 
                        ${lunchTime}</span>
                </p>
            </div>
            <div class="col-4 d-flex justify-content-end">
                <a style="text-decoration: none;" class="text-primary-emphasis menu-link"
                    href="https://abo-academi.ravintolapalvelut.iss.fi/abo-academi">${menuLinkTxt}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                        fill="currentColor"
                        class="bi bi-box-arrow-up-right mb-1 ml-1"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                        <path fill-rule="evenodd"
                            d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                    </svg>
                </a>
            </div>
        </div>`;
                    break;
                case 'cotton-menu':
                    lunchTimeElement.innerHTML = `<div class="row d-flex justify-content-between">
            <div class="col-8">
                <p class="openTxt"><b>${openTxt}</b><span
                        class="text-success"> 
                        ${lunchTime}</span>
                </p>
            </div>
            <div class="col-4 d-flex justify-content-end">
                <a style="text-decoration: none;" class="text-primary-emphasis menu-link"
                    href="https://www.lounaat.info/lounas/cotton-club/vaasa">${menuLinkTxt}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                        fill="currentColor"
                        class="bi bi-box-arrow-up-right mb-1 ml-1"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                        <path fill-rule="evenodd"
                            d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                    </svg>
                </a>
            </div>
        </div>`;
                    break;
            }
            lunchDiv.appendChild(lunchTimeElement);
            if (lunchDiv.id == 'alexander-menu') {
                const menuParagraph = document.createElement('p');

                // Split, trim and filter the menu items
                const menuItems = match[1].split('<br>').map(item => item.trim()).filter(item => item && !item.includes('Sale of leftover food'));

                // Capitalize the first letter after every comma
                const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);
                const formattedMenuItems = menuItems.map(item =>
                    item.split(',').map(capitalizeFirstLetter).join(', ')
                );
                menuParagraph.innerHTML = "<b>Lunch/lounas</b>: " + formattedMenuItems;
                lunchDiv.appendChild(menuParagraph);
            } else {
                const menuParagraph = document.createElement('p');

                const formattedMenuItems = [];
                const parser = new DOMParser();
                const doc = parser.parseFromString(match[1], 'text/html');
                doc.querySelectorAll('li .dish').forEach(dishElement => {
                    // Extract the text content and remove the price
                    let dishText = dishElement.textContent.replace(/\d+,\d+ \/ \d+,\d+e/g, '').trim();
                    dishText = dishText.split(',').map(word => word.trim()).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(', ');
                    formattedMenuItems.push(dishText);
                });
                menuParagraph.innerHTML = "<b>Lunch/lounas</b>: " + formattedMenuItems;
                lunchDiv.appendChild(menuParagraph);
            }
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
        document.getElementById(divId).innerHTML = 'Failed to fetch lunch data.';
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

        // Regular expression to extract menu items
        const regex = /:\s*([^:(]*?)(?:\s*\(|$)/g;

        // Function to clean up and format menu items
        const cleanUpItems = (items) => {
            return items.map(item => {
                let cleanedItem = item.trim().replace(/,\s*$/, '');
                return cleanedItem;
            }).filter(item => item && item !== "()");
        };

        // Function to extract and format menu from a given string
        const formatMenu = (menuString, locationName) => {
            const matches = [...menuString.matchAll(regex)];
            let extractedItems = matches.map(match => match[1].trim()).filter(item => item && item !== "()");
            // Clean up extracted items to avoid double commas
            extractedItems = cleanUpItems(extractedItems);
            return extractedItems.length > 0 ? `\u{1F4CD}${locationName}: ${extractedItems.join(', ')}` : `\u{1F4CD}${locationName}: No items listed`;
        };

        // Get the menu items from the DOM
        const arcadaMenu = document.getElementById('alexander-menu').innerText;
        const diakMenu = document.getElementById('cotton-menu').innerText;

        // Construct the lunch object
        const lunchObj = `${heading}\n\n${formatMenu(arcadaMenu, "Arcada")}\n\n${formatMenu(diakMenu, "DIAK")}\n\n${formatMenu(artebiaMenu, "Artebia")}\n\n${formatMenu(chemicumMenu, "Chemicum")}`;
        console.log(formatMenu(arcadaMenu, "Arcada"));

        // Copy the lunch object to the clipboard
        navigator.clipboard.writeText(lunchObj)
    } catch (error) {
        outputError(error.message + ` (${error.stack})`);
        console.error('An error occurred:', error);
    }
};

document.querySelector('#collapseOne').addEventListener('show.bs.collapse', function () {
    fetchLunch(`https://abo-academi.ravintolapalvelut.iss.fi/abo-academi`, 'alexander-menu');
});

document.querySelector('#collapseTwo').addEventListener('show.bs.collapse', function () {
    fetchLunch(`https://www.lounaat.info/lounas/cotton-club/vaasa`, 'cotton-menu');
});

document.getElementById('copy-div').addEventListener('click', function () {
    this.classList.add('animated');

    copyLunchToClipboard();

    this.addEventListener('animationend', function () {
        this.classList.remove('animated');
    });
});

// Call the async function to fetch and display the food menu
fetchLunch(`https://abo-academi.ravintolapalvelut.iss.fi/abo-academi`, 'alexander-menu');
fetchLunch(`https://www.lounaat.info/lounas/cotton-club/vaasa`, 'cotton-menu');

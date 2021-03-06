// main.ts: Main TypeScript file, containing all the onload logic
// Project: homepage
// by: njhlai

// import required interfaces
import {weatherData, searchEngine, configData} from './types/configDataStructs.js';

// import require classes
import {bookmarkSet} from './types/bookmarkSet.js';

// grab required HTMLElements
let searchField = document.getElementById('search-field')! as HTMLInputElement;
let searcher = document.getElementById('search')! as HTMLElement;
let searchprompt = document.getElementById('prompt')! as HTMLElement;
let searchdirectory = document.getElementById('directory')! as HTMLElement;
let calendar = document.getElementById('calendar')! as HTMLElement;
let clock = document.getElementById('clock')! as HTMLElement;
let weather = document.getElementById('weather')! as HTMLElement;
let temp = document.getElementById('temp')! as HTMLElement;
let weatherDesc = document.getElementById('weather-description')! as HTMLElement;
let listEl = document.querySelector('#thelist')! as HTMLElement;

// define custom element <bookmark-set>
customElements.define('bookmark-set', bookmarkSet);

// all other required global variables
let ignore = false;
var engines: searchEngine[] = [];

// Event listener to open search/change search engine
document.addEventListener('keydown', function(event)  {
	if (event.keyCode == 27) {
		// Esc to close search
		searchField.value = '';
		searchField.blur();
		searcher.style.display = 'none';
	} else if (event.keyCode == 9) {
		engines.push(engines.shift()!);

		// update search directory
		searchdirectory.innerText = '~/browser/search/' + engines[0].engine;
	} else {
		var inp = String.fromCharCode(event.keyCode);
		ignore = ignore || event.altKey || event.ctrlKey || event.metaKey;
		if (/[a-zA-Z0-9-_ ]/.test(inp) && !ignore) {  
			// detect typing to open search
			searcher.style.display = 'flex';
			searchField.focus();
		}
	}
});

document.addEventListener('keyup', function(event)  {
	ignore = false;
});

// Search on enter key event
searchField.addEventListener('keypress', function(event)  {
	if (event.keyCode == 13) {
		var val = searchField.value;
		window.location.href = engines[0].query + val;

		// close search
		searchField.value = '';
		searchField.blur();
		searcher.style.display = 'none';
	}
});

// Get current time and format
function getTime() {
	let date = new Date(),
		min = date.getMinutes(),
		sec = date.getSeconds(),
		hour = date.getHours();
	return "" + 
		(hour < 10 ? ("0" + hour) : hour) + ":" + 
		(min < 10 ? ("0" + min) : min) + ":" + 
		(sec < 10 ? ("0" + sec) : sec);
}

// Get weather information
function displayWeather(weatherConf: weatherData) {
	let xhr = new XMLHttpRequest();

	// Request to open weather map
	xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + weatherConf.lat! + '&lon=' + weatherConf.lon! + '&units=' + weatherConf.units! + '&appid=' + weatherConf.appid!);
	xhr.onload = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let json = JSON.parse(xhr.responseText);
				temp.innerText = json.main.temp.toFixed(0) + " C";
				weatherDesc.innerText = json.weather[0].description;
			} else {
				console.log('error msg: ' + xhr.status);
			}
		}
	}
	xhr.send();
}

// Parse and create page
function parseAndCreate(confData: configData) {
	// Set the date
	if (confData.timeConf.enableDate) {
		let date = new Date();
		calendar.innerText = date.toLocaleString(confData.timeConf.locale, confData.timeConf.options);
		calendar.style.visibility = 'visible';
	}

	// Set up the clock
	if (confData.timeConf.enableTime) {
		clock.innerText = getTime();
		clock.style.visibility = 'visible';

		// Set clock interval to tick clock
		setInterval( () => {
			clock.innerText = getTime();
		},100);
	}

	// Set up weather teller
	if (confData.weatherConf.enableWeather) {
		displayWeather(confData.weatherConf);
		weather.style.visibility = 'visible';
	}

	// Write each square
	for (let row of confData.squares) {
		listEl.append(new bookmarkSet(row));
	}

	// Set up search page
	if (confData.searchConf.enableSearch) {
		// Set up the search prompt
		searchprompt.innerText = confData.username + '@Homepage';

		// Set list of search engines
		engines = confData.searchConf.searchEngines;

		// Set search directory
		searchdirectory.innerText = '~/browser/search/' + engines[0].engine;
	}
}

// Read config files (in JSON)
function readJSON(fileName: string) {
	console.log("Initialising first read");

	// Load the data of the passed file.
	fetch(fileName)
		.then(response => { return response.json(); })
		.then(configJSON => {
			parseAndCreate(configJSON);
			sessionStorage.setItem('confData', JSON.stringify(configJSON));
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

window.onload = () => {
	let sessionData = sessionStorage.getItem('confData');
	sessionData? parseAndCreate(JSON.parse(sessionData)) : readJSON('config.json');
}
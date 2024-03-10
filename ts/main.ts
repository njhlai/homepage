import { weatherConf, searchEngine, configData } from "./types/configDataStructs.js";
import { bookmarkSet } from "./types/bookmarkSet.js";
import { readJSON } from "./utils.js";

// grab required HTMLElements
const searchField = document.getElementById("search-field") as HTMLInputElement;
const searcher = document.getElementById("search") as HTMLElement;
const searchprompt = document.getElementById("prompt") as HTMLElement;
const searchdirectory = document.getElementById("directory") as HTMLElement;
const calendar = document.getElementById("calendar") as HTMLElement;
const clock = document.getElementById("clock") as HTMLElement;
const weather = document.getElementById("weather") as HTMLElement;
const temp = document.getElementById("temp") as HTMLElement;
const weatherDesc = document.getElementById("weather-description") as HTMLElement;
const listEl = document.querySelector("#thelist") as HTMLElement;

// define custom element <bookmark-set>
customElements.define("bookmark-set", bookmarkSet);

// all other required global variables
let ignore = false;
let searchIgnore = false;
let engines: searchEngine[] = [];

// Open search/change search engine
document.addEventListener("keydown", function (event) {
    if (event.code == "Escape") {
        searchField.value = "";
        searchField.blur();
        searcher.style.display = "none";
    } else if (event.code == "Tab") {
        const engine = engines.shift();

        if (engine) {
            engines.push(engine);
            searchdirectory.innerText = "~/browser/search/" + engines[0].engine;
        }
    } else {
        ignore = ignore || searchIgnore || event.altKey || event.ctrlKey || event.metaKey;

        if (!ignore && /(Digit)|(Key)/.test(event.code)) {
            searcher.style.display = "flex";
            searchField.focus();
        }
    }
});

document.addEventListener("keyup", function () {
    ignore = searchIgnore;
});

// Search on enter key event
searchField.addEventListener("keypress", function (event) {
    if (event.code == "Enter") {
        const val = searchField.value;
        window.location.href = engines[0].query + val;

        // close search
        searchField.value = "";
        searchField.blur();
        searcher.style.display = "none";
    }
});

// Get current time and format
function getTime() {
    const date = new Date(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        hour = date.getHours();
    return "" + (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
}

// Get weather information
function displayWeather(weatherConf: weatherConf) {
    const xhr = new XMLHttpRequest();

    // Request to open weather map
    xhr.open(
        "GET",
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
            weatherConf.lat +
            "&lon=" +
            weatherConf.lon +
            "&units=" +
            weatherConf.units +
            "&appid=" +
            weatherConf.appid,
        true,
    );
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const json = JSON.parse(xhr.responseText) as {
                    main: { temp: number };
                    weather: { description: string }[];
                };
                temp.innerText = json.main.temp.toFixed(0) + " C";
                weatherDesc.innerText = json.weather[0].description;
            } else {
                console.log("error msg: " + xhr.status);
            }
        }
    };

    xhr.send();
}

// Parse and create page
function parseAndCreate(confData: configData) {
    // Set the date
    if (confData.timeConf.enableDate) {
        const date = new Date();
        calendar.innerText = date.toLocaleString(confData.timeConf.locale, confData.timeConf.options);
        calendar.style.visibility = "visible";
    }

    // Set up the clock
    if (confData.timeConf.enableTime) {
        clock.innerText = getTime();
        clock.style.visibility = "visible";

        setInterval(() => {
            clock.innerText = getTime();
        }, 100);
    }

    // Set up weather teller
    if (confData.weatherConf.enableWeather) {
        displayWeather(confData.weatherConf);
        weather.style.visibility = "visible";
    }

    // Write each square
    for (const col of confData.squares) {
        listEl.append(new bookmarkSet(col));
    }

    // Set up search page
    if (confData.searchConf.enableSearch) {
        searchprompt.innerText = confData.username + "@Homepage";
        engines = confData.searchConf.searchEngines;
        searchdirectory.innerText = "~/browser/search/" + engines[0].engine;
    } else {
        searchIgnore = true;
    }
}

window.onload = () => {
    const sessionData = sessionStorage.getItem("confData");
    sessionData ? parseAndCreate(JSON.parse(sessionData) as configData) : readJSON("config.json", parseAndCreate);
};

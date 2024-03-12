import { configData, searchEngine, square } from "./types/configDataStructs.js";
import { readDefaultConfig } from "./utils.js";

// grab required HTMLElements
const enableJSON = document.getElementById("enableJSON") as HTMLInputElement;
const normal = document.getElementById("normal") as HTMLElement;
const username = document.getElementById("username") as HTMLInputElement;
const squares = document.getElementById("squares") as HTMLTextAreaElement;
const enableSearch = document.getElementById("enableSearch") as HTMLInputElement;
const search = document.getElementById("search") as HTMLElement;
const engines = document.getElementById("engines") as HTMLTextAreaElement;
const enableDate = document.getElementById("enableDate") as HTMLInputElement;
const enableTime = document.getElementById("enableTime") as HTMLInputElement;
const date = document.getElementById("date") as HTMLElement;
const locale = document.getElementById("locale") as HTMLInputElement;
const optionWeekday = document.getElementById("optionWeekday") as HTMLSelectElement;
const optionYear = document.getElementById("optionYear") as HTMLSelectElement;
const optionMonth = document.getElementById("optionMonth") as HTMLSelectElement;
const optionDay = document.getElementById("optionDay") as HTMLSelectElement;
const enableWeather = document.getElementById("enableWeather") as HTMLInputElement;
const weather = document.getElementById("weather") as HTMLElement;
const appid = document.getElementById("appid") as HTMLInputElement;
const lat = document.getElementById("lat") as HTMLInputElement;
const lon = document.getElementById("lon") as HTMLInputElement;
const units = document.getElementById("units") as HTMLSelectElement;
const json = document.getElementById("json") as HTMLElement;
const config = document.getElementById("config") as HTMLTextAreaElement;

// Parse and populate options form
function populateOption(confData: configData) {
    username.value = confData.username;
    squares.value = JSON.stringify(confData.squares, null, 2);

    // Populate search options
    enableSearch.checked = confData.searchConf.enableSearch;
    engines.value = JSON.stringify(confData.searchConf.searchEngines, null, 2);

    // Populate time options
    enableTime.checked = confData.timeConf.enableTime;
    enableDate.checked = confData.timeConf.enableDate;
    locale.value = confData.timeConf.locale as string;
    optionWeekday.value = confData.timeConf.options.weekday as string;
    optionYear.value = confData.timeConf.options.year as string;
    optionMonth.value = confData.timeConf.options.month as string;
    optionDay.value = confData.timeConf.options.day as string;

    // Populate weather options
    enableWeather.checked = confData.weatherConf.enableWeather;
    appid.value = confData.weatherConf.appid;
    lat.value = confData.weatherConf.lat;
    lon.value = confData.weatherConf.lon;
    units.value = confData.weatherConf.units;

    config.value = JSON.stringify(confData, null, 2);

    search.style.display = enableSearch.checked ? "flex" : "none";
    date.style.display = enableDate.checked ? "flex" : "none";
    weather.style.display = enableWeather.checked ? "flex" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
    const localData = localStorage.getItem("confData");
    localData ? populateOption(JSON.parse(localData) as configData) : readDefaultConfig(populateOption);

    enableJSON.checked = false;
});

// Toggle search config options
enableSearch.addEventListener("change", function () {
    search.style.display = enableSearch.checked ? "flex" : "none";
});

// Toggle date config options
enableDate.addEventListener("change", function () {
    date.style.display = enableDate.checked ? "flex" : "none";
});

// Toggle weather config options
enableWeather.addEventListener("change", function () {
    weather.style.display = enableWeather.checked ? "flex" : "none";
});

// Toggle config input method
enableJSON.addEventListener("change", function () {
    [normal.style.display, json.style.display] = [json.style.display, normal.style.display];
});

// Save current configuration
document.querySelector("form")?.addEventListener("submit", function (e: SubmitEvent) {
    e.preventDefault();

    const confData = enableJSON.checked
        ? (JSON.parse(config.value) as configData)
        : {
              username: username.value,
              squares: JSON.parse(squares.value) as square[],
              searchConf: {
                  enableSearch: enableSearch.checked,
                  searchEngines: JSON.parse(engines.value) as searchEngine[],
              },
              timeConf: {
                  enableDate: enableDate.checked,
                  enableTime: enableTime.checked,
                  locale: locale.value as Intl.LocalesArgument,
                  options: {
                      weekday: optionWeekday.value,
                      year: optionYear.value,
                      month: optionMonth.value,
                      day: optionDay.value,
                  } as Intl.DateTimeFormatOptions,
              },
              weatherConf: {
                  enableWeather: enableWeather.checked,
                  appid: appid.value,
                  lat: lat.value,
                  lon: lon.value,
                  units: units.value,
              },
          };

    populateOption(confData);
    localStorage.setItem("confData", JSON.stringify(confData));
});

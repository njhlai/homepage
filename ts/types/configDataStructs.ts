// Type definitions for configDataStructs
// Project: homepage
// Definitions by: njhlai

export interface linkEntry {
	name: string;
	url: string;
}

export interface square {
	title: string;
    color: string;
	links: linkEntry[];
}

export interface option {
    weekday: string;
    year: string;
    month: string; 
    day: string;
}

export interface timeData {
    enableDate: boolean; 
    enableTime: boolean;
    locale: string; 
    options: Intl.DateTimeFormatOptions;
}

export interface weatherData {
    enableWeather: boolean;
    lat: string;
    lon: string;
    units: string;
    appid: string;
}

export interface searchEngine {
    engine: string;
    query: string;
}

export interface searchConf {
    enableSearch: boolean;
    searchEngines: searchEngine[];
}

export interface configData {
    username: string;
	squares: square[];
	searchConf: searchConf;
    enableLocation: boolean;
	timeConf: timeData;
	weatherConf: weatherData;
}
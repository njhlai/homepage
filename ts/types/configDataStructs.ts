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
    locale: string; 
    options: Intl.DateTimeFormatOptions;
}

export interface weatherData {
    lat: string;
    lon: string;
    units: string;
    appid: string;
}

export interface configData {
	squares: square[];
	searchEngine: string;
    enableLocation: boolean;
	timeConf: timeData;
	weatherConf: weatherData;
}
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

export interface timeConf {
    enableDate: boolean;
    enableTime: boolean;
    locale: Intl.LocalesArgument;
    options: Intl.DateTimeFormatOptions;
}

export interface weatherConf {
    enableWeather: boolean;
    appid: string;
    lat: string;
    lon: string;
    units: string;
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
    timeConf: timeConf;
    weatherConf: weatherConf;
}

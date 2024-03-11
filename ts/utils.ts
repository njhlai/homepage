import { configData } from "./types/configDataStructs.js";

// Read default config
export function readDefaultConfig(populator: (arg0: configData) => void) {
    console.log("Initialising first read");

    const defaultConfig = {
        username: "YourName",
        squares: [
            {
                title: "Media",
                color: "#4dd0e1",
                links: [
                    {
                        name: "Spotify",
                        url: "https://open.spotify.com/",
                    },
                    {
                        name: "YoutubeMusic",
                        url: "https://music.youtube.com/",
                    },
                    {
                        name: "Netflix",
                        url: "https://netflix.com",
                    },
                    {
                        name: "Youtube",
                        url: "https://youtube.com",
                    },
                ],
            },
            {
                title: "Dev",
                color: "#f06292",
                links: [
                    {
                        name: "GitHub",
                        url: "https://github.com/",
                    },
                    {
                        name: "GitLab",
                        url: "https://gitlab.com/",
                    },
                    {
                        name: "LocalHost",
                        url: "localhost:8000",
                    },
                ],
            },
            {
                title: "Template",
                color: "#fff",
                links: [
                    {
                        name: "Google",
                        url: "https://google.com/",
                    },
                ],
            },
        ],
        searchConf: {
            enableSearch: true,
            searchEngines: [
                {
                    engine: "Google",
                    query: "https://www.google.com/search?q=",
                },
                {
                    engine: "DuckDuckGo",
                    query: "https://duckduckgo.com/?q=",
                },
            ],
        },
        enableLocation: false,
        timeConf: {
            enableDate: true,
            enableTime: true,
            locale: "en-Us",
            options: {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            },
        },
        weatherConf: {
            enableWeather: true,
            appid: "",
            lat: "90",
            lon: "135",
            units: "metric",
        },
    } as configData;

    // Load default config using `populator`
    populator(defaultConfig);
    localStorage.setItem("confData", JSON.stringify(defaultConfig));
}

# Minimal-Dark-Homepage

![preview](.github/captured.gif)

## About
A Firefox/Chrome newtab override extension written in vanilla [HTML](https://html.spec.whatwg.org/), [CSS](https://www.w3.org/TR/CSS/#css) and [Typescript](https://www.typescriptlang.org/).

This project started off as a copy of [Jaredk3nt/homepage](https://github.com/Jaredk3nt/homepage), modified to my own personal preference, and later evolved into a newtab override extension heavily inspired by [deepjyoti30/startpage](https://github.com/deepjyoti30/startpage/).

## Requirements
- [nvm](https://github.com/nvm-sh/nvm)
- [npm](https://www.npmjs.com/)

## Setup Dev Environment
Setup the dev environment for the project by running:
```sh
nvm install && npm install
```

## Installation
You can install this both on Chrome and Firefox.

### Chrome
- Get the latest release (zip) or clone this repo and extract it.
- Add an `icon.png` of your choice into `img/`.
- Compile the TypeScripts in `ts/` by running:
```sh
npm run compile
```
- On chrome, open extensions from the tool menu or open it from `chrome://extensions`.
- Click on `load unpacked`, navigate to the directory where you cloned the repo and select it.

### Firefox
- Get the latest release (zip) or clone this repo and extract it.
- Add an `icon.png` of your choice into `img/`.
- Compile the TypeScripts in `ts/` by running:
```sh
npm run compile
```
- Build using `web-ext`, which will create a zip file in `web-ext-artifacts/`:
```sh
npm run build
```
- You can now load this by navigating to the `about:debugging`, click on `This Firefox`, click on `Load Temporary Add-on...` and select the zip file from the step before, in `web-ext-artifacts/`. This will load the extension for the current session only.
    - To have this more permenantly, you'll need to sign it using `web-ext`. See [here](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#using-web-ext-section).
- Navigate to `about:addons => minimal-dark-homepage => Preference` to configure the extension.

## Settings
You can configure this extension under `about:addons => minimal-dark-homepage => Preference` and going through each option, or by supplying a JSON string.

Here is a guide to writing your own configuration JSON string. Refer to `example_config.json` (supplying the default configuration) as an example and for more details.

### username
Your display name. This is used in the search UI.

### squares
This is a list of `square`, which is essentially a collection of links group by its title, which are of the form
```json
{
    "title": "{{ title of square }}",
    "color": "{{ hexcode of color of title }}",
    "links": ["{{ list of links }}"]
}
```

### searchConf
This is a `JSON` of the form
```json
{
    "enableSearch": "{{ boolean for search display }}",
    "searchEngines": "{{ list of search engines, see searchEngines }}",
}
```

### searchEngines
A list of your search engines of choice. Each search engine item to be displayed in the search UI is of the form
```json
{
    "engine": "{{ name of search engine }}",
    "query": "{{ query url }}",
}
```
The search querry will be appended to the end of query url during search. Pressing TAB will cycle through the search engines in this list.

### timeConf
This is a `JSON` of the form
```json
{
    "enableDate": "{{ boolean for date display }}",
    "enableTime": "{{ boolean for time display }}",
    "locale": "{{ string of date-time locale }}",
    "options": "{{ Intl.dateTimeFormatOptions for additional options }}",
}
```

### weatherConf
This is a `JSON` of the form
```json
{
    "enableWeather": "{{ boolean for weather display }}",
    "lat": "{{ string for lattitude }}",
    "lon": "{{ string for longtitude }}",
    "units": "{{ metric or imperial unit }}",
    "appid": "{{ appid of openweathermap.org }}",
}
```

## References
- The design of the page is heavily based on [Jaredk3nt/homepage](https://github.com/Jaredk3nt/homepage).
- The initial code to package `homepage` as an extension is heavily based on [deepjyoti30/startpage](https://github.com/deepjyoti30/startpage/).

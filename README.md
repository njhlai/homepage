# Minimal-Homepage

<img src=".github/captured.gif">

## About
This project started off as a copy of [Jaredk3nt/homepage](https://github.com/Jaredk3nt/homepage), modified to my own personal preference. Then, heavily inspired by [deepjyoti30/startpage](https://github.com/deepjyoti30/startpage/), as a practice in TypeScript, and sheer boredom, this project is finally in its current form.

## Installation
Currently, this is only available on chrome.

### Chrome
- Get the latest release (zip) or clone this repo and extract it.
- Write the ```config.json``` for the configuration of the homepage, based on the template provided in  [config_template.json](https://github.com/njhlai/homepage/blob/master/config_template.json).
- Add an ```icon.png``` of your choice into ```img/```.
- Compile the TypeScripts in ```js/``` by running
    ```shell-script
        > cd js/
        > tsc
    ```
- On chrome, open extensions from the tool menu or open it from [chrome://extensions](chrome://extensions).
- Click on load unpacked, navigate to the directory where you cloned the repo and select it.

## Settings
Here is a guide to the writing your ```config.json```.

### squares
This is a list of ```squares```, which is essentially a collection of links group by its title, which are of the form
```JSON
    { 
		"title": //title of square, 
		"color": //hexcode of color of the title, 
		"links": [//list of links//]
	}
```

### searchEngine
A ```string``` which is the query url for your search engine of choice. The search querry will be appended to the end of this string during search.

### enableLocation
A ```boolean``` which indicates geolocation. No feature currently associated to this ```boolean```.

### timeConf
This is a ```JSON``` of the form
```JSON
    { 
		"enableDate": //boolean for date display, 
		"locale": //string of date-time locale, 
		"options": //Intl.dateTimeFormatOptions for additional options
	}
```

### weatherConf
This is a ```JSON``` of the form
```JSON
    { 
		"lat": //lattitude,
		"lon": //longtitude",
		"units": //metric or imperial unit,
		"appid": //appid of openweathermap.org
	}
```
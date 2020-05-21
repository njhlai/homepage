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

export class bookmarkSet extends HTMLElement {
    constructor(data?: square) {
        super();
        // Could also create a template in js once, and set innerHtml.  That'll move it into this file.
        const template = document.getElementById('bookmarkTemplate') as HTMLTemplateElement;

        // create shadow DOM 
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        if (data?.title) {
            const el = document.createElement('span');
            el.slot = 'bookmark-title';
            el.append(data.title);
            el.style.color = data.color;
            this.append(el);
        }

        if (data?.links!.length) {
        	const el = document.createElement('span');
            el.slot = 'bookmark-inner-container';

        	for (let link of data!.links) {
        		const url = document.createElement('a');
	        	url.classList.add('bookmark');
	        	url.append(link.name);
	        	url.href = link.url;
	        	el.append(url);
        	}

        	this.append(el);
        }
    }

    get title(): string {
        return this.querySelector('[slot="bookmark-title"]')?.textContent || "";
    }

    get links(): linkEntry[] {
        let listLinks = this.querySelector('[slot="bookmark-inner-container"]')!;
        let unrolledList = [];

        for (const child of listLinks.children) {
            let link = child as HTMLAnchorElement;
            unrolledList.push({
                name: link.text,
                url: link.href
            }); 
        }
        return unrolledList;
    }
}

customElements.define('bookmark-set', bookmarkSet)
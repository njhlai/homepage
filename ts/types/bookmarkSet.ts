import { linkEntry, square } from "./configDataStructs.js";

export class bookmarkSet extends HTMLElement {
    constructor(data: square) {
        super();
        // Could also create a template in js once, and set innerHtml.  That'll move it into this file.
        const template = document.getElementById("bookmarkTemplate") as HTMLTemplateElement;

        // create shadow DOM
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));

        if (data?.title) {
            const el = document.createElement("span");
            el.slot = "bookmark-title";
            el.append(data.title);
            el.style.color = data.color;

            const elChild = document.createElement("span");
            elChild.slot = "bookmark-inner-container";

            if (data.links.length) {
                el.addEventListener("click", function () {
                    for (const link of data.links) {
                        console.log(link.url);
                    }
                });

                for (const link of data.links) {
                    const url = document.createElement("a");
                    url.classList.add("bookmark");
                    url.append(link.name);
                    url.href = link.url;
                    elChild.append(url);
                }
            }

            this.append(el);
            this.append(elChild);
        }
    }

    get title(): string {
        return this.querySelector('[slot="bookmark-title"]')?.textContent || "";
    }

    get links(): linkEntry[] {
        const listLinks = this.querySelector('[slot="bookmark-inner-container"]');
        const unrolledList = [];

        if (listLinks) {
            for (const child of listLinks.children) {
                const link = child as HTMLAnchorElement;
                unrolledList.push({
                    name: link.text,
                    url: link.href,
                });
            }
        }

        return unrolledList;
    }
}

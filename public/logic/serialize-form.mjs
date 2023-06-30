import { getImages } from "./get-images.mjs";
import { getHeadlines } from "./get-headlines.mjs";
import { getHrefs } from "./get-hrefs.mjs";
import { getLi } from "./get-li.mjs";
import { getParagraphs } from "./get-p.mjs";


export function serialzeForm() {
    const form = document.getElementById('scraperForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const url = document.getElementById('urlInput').value;
        const selector = document.getElementById('selectorInput').value;
        const data = {
            url,
            selector,
        };
    
        fetch('/data-to-scrape', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error(error);
        });
        getImages();
        getHeadlines();
        getHrefs();
        getLi();
        getParagraphs();
    });
}
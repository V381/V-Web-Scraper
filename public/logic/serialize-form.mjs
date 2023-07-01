import { getImages } from "./get-images.mjs";
import { getHeadlines } from "./get-headlines.mjs";
import { getHrefs } from "./get-hrefs.mjs";
import { getLi } from "./get-li.mjs";
import { getParagraphs } from "./get-p.mjs";

export function serializeForm() {
  const form = document.getElementById('scraperForm');
  const stackCheckbox = document.getElementById('stack');
  const itemsContainer = document.querySelector(".items");
  let flagToStack = stackCheckbox.checked;

  function appendItemsToContainer() {
    if (flagToStack) {
      getImages();
      getHeadlines();
      getHrefs();
      getLi();
      getParagraphs();
    } else {
      itemsContainer.innerHTML = "";
      getImages();
      getHeadlines();
      getHrefs();
      getLi();
      getParagraphs();
    }
  }

  stackCheckbox.addEventListener('change', () => {
    flagToStack = stackCheckbox.checked;
    appendItemsToContainer();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const url = document.getElementById('urlInput').value;
    const selector = document.getElementById('selectorInput').value;
    const data = {
      url,
      selector,
    };

    fetch('/data-to-scrape/', { 
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

    if (!stackCheckbox.checked) {
      itemsContainer.innerHTML = "";
      appendItemsToContainer();
    }
  });
}

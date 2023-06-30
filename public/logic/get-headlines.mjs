import { appedElToDom } from "./append-to-dom-el.mjs";
const itemsContainer = document.querySelector(".items");
let flag = false;
export function getHeadlines(headlineText) {
    const socket = io();
    socket.on("headlinesDownloaded", (data) => {
      const { headlines, index } = data;
      if (index === 0 && !flag) {
        const headline = document.createElement('h1');
        headline.textContent = headlineText;
        itemsContainer.appendChild(headline);
        flag = true;
      }
      appedElToDom("h2", headlines);
    });
}
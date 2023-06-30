
import { appedElToDom } from "./append-to-dom-el.mjs";

const itemsContainer = document.querySelector(".items");
let flag = false;

export function getImages(headlineText) {
  const socket = io();
  socket.on("imageDownloaded", (data) => {
    const { imageUrl, index } = data;
    if (index === 0 && !flag) {
      const headline = document.createElement('h1');
      headline.textContent = headlineText;
      itemsContainer.appendChild(headline);
      flag = true;
    }
    appedElToDom("img", imageUrl);
  });
}
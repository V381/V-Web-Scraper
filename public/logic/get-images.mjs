
import { appedElToDom } from "./append-to-dom-el.mjs";

export function getImages(headlineText) {
  const socket = io();
  socket.on("imageDownloaded", (data) => {
    const { imageUrl, index } = data;
    appedElToDom("img", imageUrl);
  });
}
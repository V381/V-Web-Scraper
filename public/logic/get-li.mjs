
import { appedElToDom } from "./append-to-dom-el.mjs";

export function getLi() {
  const socket = io();
  socket.on("liDownloaded", (data) => {
    const { li, index } = data;
    appedElToDom("li", li);
  });
}
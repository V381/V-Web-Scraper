
import { appedElToDom } from "./append-to-dom-el.mjs";

export function getParagraphs() {
  const socket = io();
  socket.on("pDownloaded", (data) => {
    const { p, index } = data;
    appedElToDom("p", p);
  });
}
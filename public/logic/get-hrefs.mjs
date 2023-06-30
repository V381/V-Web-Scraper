
import { appedElToDom } from "./append-to-dom-el.mjs";

export function getHrefs() {
  const socket = io();
  socket.on("hrefsDownloaded", (data) => {
    const { hrefs, index } = data;
    appedElToDom("a", hrefs);
  });
}
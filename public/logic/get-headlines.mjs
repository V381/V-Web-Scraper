import { appedElToDom } from "./append-to-dom-el.mjs";
export function getHeadlines() {
    const socket = io();
    socket.on("headlinesDownloaded", (data) => {
      const { headlines, index } = data;
      appedElToDom("h2", headlines);
    });
}
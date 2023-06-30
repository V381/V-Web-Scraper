const itemsContainer = document.querySelector(".items");
export function appedElToDom(el, url) {
    switch (el) {
        case "img":
            const img = document.createElement(el);
            img.src = url;
            itemsContainer.appendChild(img);
          break;
        case "a":
          break;
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
            const h = document.createElement(el);
            h.textContent = url;
            itemsContainer.appendChild(h);
          break;
        case "p":
          break;
        default:
          break;
      }
    }
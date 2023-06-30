const itemsContainer = document.querySelector(".items");
const ul = document.createElement("ul");
export function appedElToDom(el, url) {
    switch (el) {
        case "img":
            const img = document.createElement(el);
            img.src = url;
            itemsContainer.appendChild(img);
          break;
        case "a":
            const href = document.createElement(el);
            href.setAttribute("href", url);
            href.textContent = url;
            itemsContainer.appendChild(href)
          break;
        case "li":
            const li = document.createElement(el);
            li.textContent = url;
            ul.appendChild(li)
            itemsContainer.appendChild(ul);
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
            const p = document.createElement(el);
            p.textContent = url;
            itemsContainer.appendChild(p);
          break;
        default:
          alert("No element found...")
          break;
      }
    }
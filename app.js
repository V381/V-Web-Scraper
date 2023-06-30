const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(bodyParser.json());
app.post("/data-to-scrape", (req, res) => {
    const { url, selector, headline } = req.body;
    console.log(url, selector, headline);
    const response = {
      status: "success",
      message: "Data received and processed successfully",
    };  
    axios
      .get(`${url}`)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
  
        const selectedElements = $(selector);
  
        selectedElements.each((index, element) => {
          const elementType = element.name;
  
          switch (elementType) {
            case "img":
              const imageUrl = $(element).attr("src");
              downloadImage(imageUrl, index);
              break;
            case "a":
              const linkUrl = $(element).attr("href");
              links(linkUrl);
              break;
            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
              const headlineText = $(element).text();
              headlines(headlineText, index)
              break;
            case "p":
              const paragraphText = $(element).text();
              paragraph(paragraphText, index);
              break;
            case "li":
              const li = $(element).text();
              list(li);
            break;
            default:
              break;
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });

    function paragraph(p, index) {
        io.emit("pDownloaded", {p: p, index});
    }

    function list(li, index) {
        io.emit("liDownloaded", {li: li, index})
    }

    function links(href, index) {
        io.emit("hrefsDownloaded", {hrefs: href, index})
    }

    function headlines(headline, index) {
        io.emit("headlinesDownloaded", { headlines: headline, index})
    }
  
    function downloadImage(imageUrl, index) {
        const formattedUrl = `${url.replace(/\.$/, '')}${imageUrl}`;
        io.emit("imageDownloaded", { imageUrl: formattedUrl, index });
        console.log(`Image ${formattedUrl} sent to the frontend.`);
    }
    res.json(response);
  });
  

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/logic'));

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('listening on *:3000');
});
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// URL of the website to scrape
const websiteUrl = 'http://www.pavlepaunovic.com';
const port = 80; // Port number

// axios.get(`${websiteUrl}:${port}`)
//   .then(response => {
//     const html = response.data;
//     const $ = cheerio.load(html);

//     // Select all image elements using the appropriate CSS selector
//     const images = $('img');

//     // Loop through each image element and download the image
//     images.each((index, element) => {
//       const imageUrl = $(element).attr('src');
//       downloadImage(imageUrl, index);
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });

// function downloadImage(imageUrl, index) {
//   // Use a library like axios or node-fetch to download the image
//   axios.get(`${websiteUrl}:${port}${imageUrl}`, { responseType: 'stream' })
//     .then(response => {
//       const filename = `image_${index}.png`;
//       const imagePath = path.join(__dirname, 'images', filename);
//       const writer = fs.createWriteStream(imagePath);

//       response.data.pipe(writer);

//       writer.on('finish', () => {
//         console.log(`Image ${filename} downloaded successfully.`);
//       });

//       writer.on('error', err => {
//         console.error(`Error downloading image ${filename}:`, err);
//       });
//     })
//     .catch(error => {
//       console.error(`Error downloading image ${imageUrl}:`, error);
//     });
// }


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/logic'));

const portExpress = process.env.PORT || 3000;

app.listen(portExpress, () => {
    console.log('listening on *:3000');
});
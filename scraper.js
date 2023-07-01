const axios = require('axios');
const cheerio = require('cheerio');

function scrapeData(url, selector, headline, io) {
  return axios.get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const selectedElements = $(selector);

      selectedElements.each((index, element) => {
        const elementType = element.name;

        switch (elementType) {
          case 'img':
            const imageUrl = $(element).attr('src');
            downloadImage(url, imageUrl, index, io);
            break;
          case 'a':
            const linkUrl = $(element).attr('href');
            emitLink(linkUrl, index, io);
            break;
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            const headlineText = $(element).text();
            emitHeadline(headlineText, index, io);
            break;
          case 'p':
            const paragraphText = $(element).text();
            emitParagraph(paragraphText, index, io);
            break;
          case 'li':
            const li = $(element).text();
            emitList(li, index, io);
            break;
          default:
            break;
        }
      });
    });
}

function emitParagraph(p, index, io) {
  io.emit('pDownloaded', { p, index });
}

function emitList(li, index, io) {
  io.emit('liDownloaded', { li, index });
}

function emitLink(href, index, io) {
  io.emit('hrefsDownloaded', { hrefs: href, index });
}

function emitHeadline(headline, index, io) {
  io.emit('headlinesDownloaded', { headlines: headline, index });
}

function downloadImage(url, imageUrl, index, io) {
  const formattedUrl = `${url.replace(/\.$/, '')}${imageUrl}`;
  io.emit('imageDownloaded', { imageUrl: formattedUrl, index });
  console.log(`Image ${formattedUrl} sent to the frontend.`);
}

module.exports = {
  scrapeData,
};

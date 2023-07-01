const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { scrapeData } = require('./scraper');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.post('/data-to-scrape', (req, res) => {
  const { url, selector, headline } = req.body;
  console.log(url, selector, headline);
  const response = {
    status: 'success',
    message: 'Data received and processed successfully',
  };

  scrapeData(url, selector, headline, io)
    .then(() => {
      res.json(response);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred during scraping' });
    });
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/logic'));
app.use(express.static(__dirname + '/public/assets'));

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

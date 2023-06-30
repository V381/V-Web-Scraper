const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/logic'));

const portExpress = process.env.PORT || 3000;

app.listen(portExpress, () => {
    console.log('listening on *:3000');
});
const express = require('express')
const mongoose = require('mongoose');
const mongo = require('./environment/mongo');
const axios = require('axios');
var cheerio = require('cheerio');
var _ = require('lodash');

const { get, identity } = require('lodash');

const app = express()
const port = 3002
var targeturl="";

app.get('/', (req, res) => {

    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
  

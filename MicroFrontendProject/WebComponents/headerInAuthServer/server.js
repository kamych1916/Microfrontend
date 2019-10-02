const express = require('express');
const server = express();

server.get('/', (req,res) => {
    res.sendFile('public/bundle.js' , { root : __dirname});
});

server.listen(3001, () => console.log('its work'));

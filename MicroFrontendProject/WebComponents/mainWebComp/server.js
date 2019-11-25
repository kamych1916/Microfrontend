const express = require('express');
const server = express();

// START OF ---- CONTRACTS WEB-COMP
server.get('/contracts/footer', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/footerContractsServer.js', { root : __dirname})
});
//  END OF  ---- CONTRACTS WEB-COMP

server.get('/contracts/header', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/headerContractsServer.js', { root : __dirname})
});

// START OF ---- MAIN WEB-COMP
server.get('/main/header', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/headerMainServer.js', { root : __dirname})
});
server.get('/main/footer', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/footerMainServer.js', { root : __dirname})
});
//  END OF  ---- MAIN WEB -COMP

// START OF ---- AUTH WEB-COMP
server.get('/auth/header', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/headerAuthServer.js', { root : __dirname})
});
server.get('/auth/footer', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/footerAuthServer.js', { root : __dirname})
});
//  END OF  ---- AUTH WEB -COMP


// START OF ---- AUTOCONTRACT WEB-COMP

server.get('/autocontract/header', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/headerAutoContractServer.js', { root : __dirname})
});

server.get('/autocontract/footer', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/footerAutoContractServer.js', { root : __dirname})
});

server.get('/modal', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/modal.js', { root : __dirname})
});

server.get('/rider', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/rider.js', { root : __dirname})
});
//  END OF  ---- AUTOCONTRACT WEB -COMP



server.listen(3000, () => console.log('server started!'));









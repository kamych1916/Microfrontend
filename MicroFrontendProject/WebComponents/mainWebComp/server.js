const express = require('express');
const server = express();
server.get('/api/testrest', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/test.png', { root : __dirname})
});

// START OF ---- HEADER WEB-COMP
server.get('/header', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/headerServer.js', { root : __dirname})
});
// END OF   ---- HEADER WEB-COMP


// START OF ---- CONTRACTS WEB-COMP
server.get('/contracts/footer', (req,res) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    res.sendFile('public/footerContractsServer.js', { root : __dirname})
});
//  END OF  ---- CONTRACTS WEB-COMP


// START OF ---- MAIN WEB-COMP
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









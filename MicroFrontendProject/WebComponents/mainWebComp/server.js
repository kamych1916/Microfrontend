const express = require('express');
const server = express();

server.get('/contracts/header', (req,res) => {
    res.sendFile('public/headerContractsServer.js', { root : __dirname})
});

server.get('/icons/exit', (req,res) => {
    res.sendFile('public/assets/Exit.png', { root : __dirname})
});

// START OF ---- MAIN WEB-COMP
server.get('/main/header', (req,res) => {
    res.sendFile('public/headerMainServer.js', { root : __dirname})
});
server.get('/main/footer', (req,res) => {
    res.sendFile('public/footerMainServer.js', { root : __dirname})
});
// END OF ---- MAIN WEB -COMP



// START OF ---- AUTOCONTRACt WEB-COMP AND ICONS
server.get('/autocontract/header', (req,res) => {
    res.sendFile('public/headerAutoContractServer.js' , { root : __dirname});
});

server.get('/autocontract/footer', (req,res) => {
    res.sendFile('public/footerAutoContractServer.js' , { root : __dirname});
});

server.get('/icons/Logo', (req,res) => {
    res.sendFile('public/assets/Logo.png', { root : __dirname})
});

server.get('/icons/LogoCompany', (req,res) => {
    res.sendFile('public/assets/Logo_Company.png', { root : __dirname})
});

server.get('/icons/LogoCompany2', (req,res) => {
    res.sendFile('public/assets/Logo_Company2.png', { root : __dirname})
});

server.get('/icons/connected2', (req,res) => {
    res.sendFile('public/assets/connected2.png', { root : __dirname})
});

server.get('/icons/Help24', (req,res) => {
    res.sendFile('public/assets/Help_24.png', { root : __dirname})
});

server.get('/icons/Password24', (req,res) => {
    res.sendFile('public/assets/Password_24.png', { root : __dirname})
});

server.get('/icons/Settings24', (req,res) => {
    res.sendFile('public/assets/Settings_24.png', { root : __dirname})
});

server.get('/icons/Support24', (req,res) => {
    res.sendFile('public/assets/Support_24.png', { root : __dirname})
});
// END OF ---- AUTOCONTRACt WEB-COMP AND ICONS


// START OF ---- MODAL WEB-COMP
server.get('/modal', (req,res) => {
    res.sendFile('public/modal.js', { root : __dirname})
});
// END OF ---- MODAL WEB -COMP


// START OF ---- AUTH WEB-COMP
server.get('/auth/header', (req,res) => {
    res.sendFile('public/headerAuthServer.js', { root : __dirname})
});
server.get('/auth/footer', (req,res) => {
    res.sendFile('public/footerAuthServer.js', { root : __dirname})
});
// END OF ---- AUTH WEB -COMP


server.listen(3000, () => console.log('server started!'));

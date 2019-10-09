const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const usersins = JSON.parse(fs.readFileSync('./database.json', 'UTF-8'))
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

const constractsDB = JSON.parse(fs.readFileSync('./contracts.json', 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

function isUserExist({name, surname, patronymic}){
  // console.log(patronymic)
  return usersins.insuranceusers.findIndex(insuranceuser => insuranceuser.name === name && insuranceuser.surname === surname || insuranceuser.patronymic === patronymic) !== -1
}

//АВТОРИЗАЦИЯ ДЛЯ СИСТЕМЫ 
server.post('/auth/login', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token})
})


// РЕГИСТРАЦИЯ НОВОГО ДОГОВОРА
server.post('/register/contract', (req, res) => {
  const {namecontract, nameclient, namecar, costcar} = req.body;
  fs.readFile("./contracts.json", (err, data) => {  
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    };

    // Get current users data
    var data = JSON.parse(data.toString());
    
    // console.log(data.insuranceusers)

    // Get the id of last user
    var last_item_id = data.contracts[data.contracts.length-1].id;

    //Add new user

    data.contracts.push({id: last_item_id + 1, namecontract: namecontract, nameclient: nameclient, namecar: namecar, costcar: costcar}); //add some data
    console.log("контракт добавлен!")

    var writeData = fs.writeFile("./contracts.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      }
    });
  });
  res.status(200)
})

//РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ ДЛЯ ДОГОВОРА
server.post('/register/user', (req, res) => {
  const {name, surname, patronymic} = req.body;
  fs.readFile("./database.json", (err, data) => {  
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    };

    // Get current users data
    var data = JSON.parse(data.toString());
    
    // console.log(data.insuranceusers)

    // Get the id of last user
    var last_item_id = data.insuranceusers[data.insuranceusers.length-1].id;

    //Add new user
    if (data.insuranceusers.findIndex(insuranceuser => insuranceuser.name === name && insuranceuser.surname === surname) !== -1){
      const status = 401
      const message = "пользователь уже существует!"
      res.status(status).json({status, message})
      return
    }else{
      console.log("пользовтель добавлен!")
      data.insuranceusers.push({id: last_item_id + 1, name: name, surname: surname, patronymic: patronymic}); //add some data
      const FullNameRegister = name + " " + surname + " " + patronymic 
      console.log(FullNameRegister)
      res.status(200).json({FullNameRegister})
    }
    var writeData = fs.writeFile("./database.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      }
    });
  });
  res.status(200)
})

// server.use(router)
server.post('/search/user', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const {name, surname, patronymic} = req.body;
  if (isUserExist({name, surname, patronymic}) === false) {
    const status = 401
    const message = 'Incorrect data'
    res.status(status).json({status, message})
    return
  }
  const FullName = surname + " " + name + " " + patronymic
  res.status(200).json({FullName})
})


server.listen(8000, () => {
  console.log('Run Auth API Server')
})

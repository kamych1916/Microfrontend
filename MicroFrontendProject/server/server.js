const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const usersins = JSON.parse(fs.readFileSync('./clients.json', 'UTF-8'))
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

const constractsDB = JSON.parse(fs.readFileSync('./contracts.json', 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '120'

// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Check if the user exists in database
function isAuthenticated({login, password}){
  return userdb.users.findIndex(user => user.login === login && user.password === password) !== -1
}

function isUserExist({name, surname, patronymic}){
  // console.log(patronymic)
  return usersins.insuranceusers.findIndex(insuranceuser => insuranceuser.name === name && insuranceuser.surname === surname || insuranceuser.patronymic === patronymic) !== -1
}

function isConractExist({namecontract, nameclient}){
  return constractsDB.contracts.findIndex(contract => contract.namecontract === namecontract && contract.nameclient === nameclient) !== -1
}


//АВТОРИЗАЦИЯ ДЛЯ СИСТЕМЫ 
server.post('/auth/login', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const {login, password} = req.body;
  if (isAuthenticated({login, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return res.status(401)
  }
  const access_token = createToken({login, password})
  res.status(200).json({access_token, login})
})


// РЕГИСТРАЦИЯ НОВОГО ДОГОВОРА
server.post('/register/contract', (req, res) => {
  const {namecontract, nameclient, namecar, costcar, namecontractrider, countroomsrider} = req.body;
  fs.readFile("./contracts.json", (err, data) => {  
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    };

    // Get current users data
    var data = JSON.parse(data.toString());
    

    // Get the id of last client
    var last_item_id = data.contracts[data.contracts.length-1].id;

    //Add new client
    if(namecontract == undefined && nameclient == undefined){
      const status = 401
      const message = "error"
      res.status(status).json({status, message})
    }else{
      console.log(namecontractrider, countroomsrider)
      // if(namecontractrider ==  undefined && countroomsrider == undefined ){
      //   // data.contracts.push({id: last_item_id + 1, namecontract: namecontract, nameclient: nameclient, namecar: namecar, costcar: costcar}); //add some data
      //   console.log("контракт добавлен!")
      // }else{
      //   console.log("lol")
      // }
      if(namecontractrider ==  undefined && countroomsrider == undefined ){
        data.contracts.push({id: last_item_id + 1, namecontract: namecontract, nameclient: nameclient, namecar: namecar, costcar: costcar}); //add some data
        console.log("контракт добавлен!")
      }else{
        // {"id":1,"rider":[{"id":"3"}],"namecontract":"321","nameclient":"2","namecar":"tesla","coatcar":"500000"}
        // {"id":3,"namecontractrider":"897","product":"property","countRooms":"2"}
        data.contracts.push({id: last_item_id + 1, rider: [{id: last_item_id + 2}], namecontract: namecontract, nameclient: nameclient, namecar: namecar, costcar: costcar}); //add some data
        data.contracts.push({id: last_item_id + 2, namecontractrider: namecontractrider, product: "property", countroomsrider: countroomsrider }); //add some data
        console.log("контракт вместе с райдером добавлены!")
      } 

    }

    var writeData = fs.writeFile("./contracts.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      }
    });
  });
  const statmess = 'контракт сохранен!'
  res.status(200).json({statmess})
})

//РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ ДЛЯ ДОГОВОРА
server.post('/register/user', (req, res) => {
  const {name, surname, patronymic} = req.body;
  fs.readFile("./clients.json", (err, data) => {  
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
    var writeData = fs.writeFile("./clients.json", JSON.stringify(data), (err, result) => {  // WRITE
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

// server.use(router)
server.post('/search/contract', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);

  const {namecontract, nameclient} = req.body;
  if (isConractExist({namecontract, nameclient}) === false) {
    const status = 401
    const message = 'Incorrect data'
    res.status(status).json({status, message})
    return
  }

  for (var key in constractsDB.contracts) {
    var item = constractsDB.contracts[key];
    if(namecontract == item.namecontract & nameclient == item.nameclient){
      costcar = item.namecar
      namecar = item.costcar
    }
  }
  const FullNameContract = "Наименование контракта: " + namecontract + ", Страхователь: " + nameclient
  res.status(200).json({FullNameContract, namecontract, nameclient, costcar, namecar})
})


server.listen(8000, () => {
  console.log('Run API Server')
})

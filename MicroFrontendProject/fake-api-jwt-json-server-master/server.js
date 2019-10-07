const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const usersins = JSON.parse(fs.readFileSync('./database.json', 'UTF-8'))
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
// function verifyToken(token){
//   return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
// }

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

function isUserExist({name, surname, patronymic}){
  // console.log(patronymic)
  return usersins.insuranceusers.findIndex(insuranceuser => insuranceuser.name === name && insuranceuser.surname === surname || insuranceuser.patronymic === patronymic) !== -1
}

//Register New User
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

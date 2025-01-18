const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require ('../backend/database')
const Event = require('./models/Event')
const User = require('../backend/models/User')
const EventGroup = require('./models/EventGroup')
const userController = require('./controllers/userController')

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Sync db
sequelize.sync({force:true}).then(()=>{
    console.log('Db synced')
});

//APIs
//app.get('/api/user/test',userController.test)
app.post('/api/user/signup',userController.signup)
app.post('/api/user/login', userController.login)

//Server start
app.listen(3000,()=>console.log('Server running on port 3000'))
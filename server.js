const express = require("express")
const app = express()
let cors = require("cors")
const sequelize = require('./database/database');
const Option = require('./models/option')
const Engine = require('./models/engine')
const Role = require('./models/role')
const User = require('./models/user')
const Purchase = require('./models/purchase')
const Model = require('./models/model')

const usersRoute = require('./routes/userRoute.js');
app.use(cors())
app.use(express.json())

app.use('/users', usersRoute);

/* let maj = async(req,res)=>{
    await sequelize.sync({force: true});
    console.log('maj effectuée');
}
maj();  */   



app.listen(3000, () => {
    console.log("serverStart")
})
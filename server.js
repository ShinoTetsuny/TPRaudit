const express = require("express")
const app = express()
let cors = require("cors")
//Models
const sequelize = require('./database/database');
const Option = require('./models/option')
const Engine = require('./models/engine')
const Role = require('./models/role')
const User = require('./models/user')
const Purchase = require('./models/purchase')
const Model = require('./models/model')

// var corsOptions = {
//     origin: 'http://localhost:3001',
//     allowedHeaders: [ 'Authorization'],
//     optionsSuccessStatus: 200 // For legacy browser support
//    }
  
app.use(cors(corsOptions))
app.use(express.json())

//Routes
const Authentication = require('./routes/authenticationRoutes')
const PurchaseRoute = require('./routes/purchaseRoutes')
const usersRoute = require('./routes/userRoute.js');
const rolesRoute = require('./routes/roleRoute.js');



app.use('/engine', require('./routes/engineRoute'))
app.use('/option', require('./routes/optionRoute'))
app.use('/model', require('./routes/modelRoute'))
app.use("/authentication", Authentication)
app.use("/purchase", PurchaseRoute)

app.use('/users', usersRoute);
app.use('/roles', rolesRoute);

/* let maj = async(req,res)=>{
    await sequelize.sync({force: true});
    console.log('maj effectuée');
}
maj();  */

app.listen(3000, () => {
    console.log("serverStart")
})
const express = require('express')
const registrationController = require('./controllers/registrationController')
const loginController = require('./controllers/loginController')

const app = express()

app.use(express.json())

app.post('/registration', registrationController)
app.post('/login', loginController )

app.listen(8080, ()=>{
    console.log('server is running')
})
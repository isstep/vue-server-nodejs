require('dotnev').config

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose ')
const path = require('path')
const corsOptions = require('./config/cors')
const connectDB = require('./config/database')
const credentials = require('./middleware/credentials')
const authenticationMiddleware = require('./middleware/authentication')

const app = express()
const PORT = 3500

connectDB()
app.use(credentials)

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

app.use(express.json)

app.use(cookieParser())

app.use('/static', express.static(path.join(__dirname,'public')))


app.use(errorHandlerMiddleware)

app.use('/api/auth', require('./routes/api/auth'))

app.all('*', (req, res) => {
    res.status(404)
  
    if(req.accepts('json')){
      res.json({'error': '404 Not Found'})
    }else{
      res.type('text').send('404 Not Found')
    }
  }) 

app.listen(PORT, ()=> {console.log(`Listening on port ${PORT}`)})
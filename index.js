require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/chat-socket')
const app = require('express')()
const http = require('http').Server(app)
const userRoute = require('./routes/userRoutes')

app.use('/', userRoute)

http.listen(3000, () => {
    console.log('Server Run on PORT: 3000')
});
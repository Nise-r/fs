const config = require('./utils/config')

const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')


mongoose.set('strictQuery',false)

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI).then(result=>{
	console.log('Connected to MongoDB')
}).catch(error=>{
	logger.error('error connecting to MongoDB',error.message)
})

app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blog',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

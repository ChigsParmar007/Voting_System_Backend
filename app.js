const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

const globleErrorHandler = require('./Utils/errorHandler')
const userRoute = require('./User/userRoutes')
const adminRoute = require('./Admin/adminRoute')
const electionRoute = require('./Election/electionRouter')
const electionResultRouter = require('./ElectionResult/electionResultRouter')

// Routers
app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/election', electionRoute)
app.use('/api/result', electionResultRouter)

// Error Handler
app.use(globleErrorHandler)

module.exports = app
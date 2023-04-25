const mongoose = require('mongoose')
const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
// const DB = process.env.MONGO_CLUSTER
const DB = process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose
    .connect(DB)
    .then(() => console.log('Mongodb Connection Successfull'))

const PORT = process.env.PORT

app.listen(PORT, () =>
    console.log(`Server is running on PORT ${PORT}`)
)
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import http from 'http'
import mongoose, { ConnectOptions } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const { ENVIRONMENT, EXPRESS_PORT,
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_DATABASE,
    MONGO_PORT } = process.env

const app = express()

if (ENVIRONMENT === 'development') {
    app.use(cors({
        credentials: true
    }))
}

app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())

const server = http.createServer(app)

const PORT = EXPRESS_PORT || 8080

const mongo_uri = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_INITDB_DATABASE}?authSource=admin`
// const mongo_uri = `mongodb://localhost:${MONGO_PORT}/${MONGO_INITDB_DATABASE}`
// const mongo_uri = `mongodb://test_db:27017`
console.log('mongo_uri', mongo_uri)


server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})


mongoose.Promise = Promise
mongoose.connect(mongo_uri).then(
    () => { console.log('Connect to database') }
)

mongoose.connection.on('error', () => {
    console.log('Unable to connect to database')
})

const userSchema = new mongoose.Schema({
    name: String,
});

const User = mongoose.model('User', userSchema);

const user = new User({
    name: 'Bill',
});

user.save().then(() => {
    const allUsers = User.find()
    console.log('allUsers', allUsers)
}
)

import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import router from './routers';

dotenv.config()

const { MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_DATABASE,
    MONGO_PORT, ENVIRONMENT } = process.env

const app = express()
app.use(morgan('dev'))
app.use(cors({
    credentials: true
}))
app.use(bodyParser.json())
app.use(compression())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json({ msg: 'hello world' })
})

app.post('/', (req, res)=> {
    console.log(req.body);
    res.status(201).json({
      message: 'Thing created successfully!'
    });
})

const server = http.createServer(app)

const PORT = Number(process.env.PORT ?? 8080)

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

const mongoPort = Number(27017 ?? MONGO_PORT)
const isDockerEnv = ENVIRONMENT === 'docker' ? 'mongodb' : 'localhost' 
const mongooseURI = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${isDockerEnv}:${mongoPort}/${MONGO_INITDB_DATABASE}?authSource=admin`

mongoose.Promise
mongoose.connect(mongooseURI).then(
    () => { console.log('Connect to database') }
)

mongoose.connection.on('error', () => {
    console.log('Unable to connect to database')
})

app.use(router())
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import router from './routes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json({ hello: 'world' })
})


app.use(router)
const server = http.createServer(app)

const PORT = Number(process.env.PORT ?? 8080)

server.listen(PORT, () => {
    console.log('Server is running at http://localhost:8080')
})
import express from 'express'
import http from 'http'
import morgan from 'morgan'

const app = express()
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json({ hello: 'world' })
})

const server = http.createServer(app)

const PORT = Number(process.env.PORT ?? 8080)

server.listen(PORT, () => {
    console.log('Server is running at http://localhost:8080')
})
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import connectDb from './db/dbConfig';
import http from 'http'
import router from './routes';
import path from 'path';

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

// database connection
connectDb()

// routes
app.get('/', (req, res) => res.render('home'));
app.use(router)

// create server
const server = http.createServer(app)
server.listen(8080, () => {
    console.log('Server running on http://localhost:8080')
})
import express from "express";

const app = express()

app.get('/', (req, res ) => 
    res.json({ message: 'hello world' }) 
);

app.get('/second', (req, res ) => 
    res.json({ message: 'second route' }) 
);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`) );
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const AuthRouter = require('./router/auth-router')
const NoteRouter = require('./router/note-router')
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        credentials: true,
        origin: process.env.CLIENT_URL
    }
));
app.use('/api/auth', AuthRouter);
app.use('/api/note', NoteRouter);
app.use(errorMiddleware)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

const start = async() => {
    try{
        console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(PORT, ()=>{
            console.log(`server started on ${PORT}`)
        })
    }
    catch(e){
        console.log(e)
    }
}

start();
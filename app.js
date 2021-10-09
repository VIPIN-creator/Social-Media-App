const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const routes = require('./router');
const cors = require('cors');
const socket = require('socket.io');

//  initiate dotenv and make your environment variables available throughout your application
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
const server = require('http').createServer(app);

dotenv.config();

// middleware section
app.use(express.static('public'));
app.use(express.json()); // to parse JSON bodies
app.use(cookieParser());
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');



const PORT = process.env.PORT || 4000;

// connect to db

mongoose.connect(`${process.env.DATABASEURL}`,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        .then( server.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
        .catch(e => console.log('error in conneting to db ', e));


// Socket Setup
const io = socket(server);

io.on('connection', (socket) => {
        console.log("Made socket connection");
});




// routes
app.use(routes);


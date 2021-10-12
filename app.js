const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const routes = require('./router');
const cors = require('cors');

//  initiate dotenv and make your environment variables available throughout your application
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();

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
var server;
mongoose.connect(`${process.env.DATABASEURL}`,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        .then( server = app.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
        .catch(e => console.log('error in conneting to db ', e));


// Socket Setup
const io = require("socket.io")(server);

const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("new user", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    io.emit("new user", [...activeUsers]);
  });

  socket.on("disconnect", () => {
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);
  });

  socket.on("chat message", function(data){
    io.emit("chat message", data);
  });

});


// routes
app.use(routes);


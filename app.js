// import required modules
const express = require('express')
const helmet = require("helmet");

let mongoose = require('mongoose');


// .env module
require('dotenv').config();

// bodyparse allows for data to be recieved from client
const bodyParser = require('body-parser');

// import controller module
const usersController = require('./controllers/usersController')

// env variables
const PORT = process.env.PORT;


// required to use fetch api on node server
const fetch = require('node-fetch');

// MongoDB connection string is stored .env
const uri = process.env.URI

// MongoDB conncection
mongoose.connect(uri, {
    useNewUrlParser: true,
    dbName: 'cooltech_credentials'
})
.then (()=>{
    const app = express();
    app.use(express.json());
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    // api routes
    app.post('/register', usersController.register)
    app.post('/login', usersController.login)
    app.post('/getrepo', usersController.getRepo)
    app.post('/getusers', usersController.getUsers)
    app.put('/updateuser', usersController.updateuser)
    app.post('/createrepo', usersController.createRepo)
    app.put('/update', usersController.update)
    app.post('/refresh', usersController.refresh)
    app.get('/logout', usersController.logout)

    // listens to port configured in .env
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
        });
})



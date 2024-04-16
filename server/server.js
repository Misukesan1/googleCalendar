require('dotenv').config({path: './config/.env'});
require('./config/database');

const express = require('express');

const cors = require('cors');
var corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200
};

// models
const userModel = require('./models/user.model');

// routes
const userRoute = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/server/users', userRoute);

// server :
app.listen(process.env.PORT, () => {
    console.log(`App lancée sur le port ${process.env.PORT}`);
});
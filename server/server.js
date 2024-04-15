const express = require('express');
const app = express();

require('dotenv').config({path: './config/.env'});
require('./config/database');


// server :
app.listen(process.env.PORT, () => {
    console.log(`App lancée sur le port ${process.env.PORT}`);
});
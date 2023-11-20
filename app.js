const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/route');
const router = express.Router();
// Database Connection

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
    dialect: process.env.DIALECT
});

const app = express();


app.use('/', routes);
app.use(express.json()); 
app.use(morgan('dev'));


// Express Listener
const listenerPort = process.env.LISTENER || 3000; // Default to 3000 if LISTENER is not set
app.listen(listenerPort, () => {
  console.log(`Server is running on port ${listenerPort}`);
});
 
// Rest of your express app logic
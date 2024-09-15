const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs');
const transactionRoutes = require('./routes/transactions')
const userRoutes = require('./routes/user')
const app = express();

require('dotenv').config();

const PORT = process.env.PORT

//middlewares
app.use(express.json());
app.use(cors({}));
  

//routes
app.use('/api/v1', transactionRoutes)
app.use('/api/user', userRoutes)

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT);
    })
}

server();
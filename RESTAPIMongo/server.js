const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
require('dotenv').config();
const DB_URI = process.env.MONGO_URI;



const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoute);

console.log(DB_URI)
mongoose.connect(DB_URI);
console.log(mongoose.connect(DB_URI));

const database = mongoose.connection;

database.on('error',(error) => {
     console.log(error);
})

database.once('connected', () => {
    console.log("Database Connected!!");
})


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})
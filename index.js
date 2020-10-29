const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require('./database');



const port = process.env.PORT||3000;

const apiRoute = require('./routes/api/apiroutes');
const { urlencoded } = require('body-parser');

app.use('/api',apiRoute);


app.listen(port,()=>{
    console.log("Aplicación corriendo en puerto : "+ port);
})


//app.use(authMiddleware)
//const authMiddleware = require('./auth')
//app.use(bodyParser.json());
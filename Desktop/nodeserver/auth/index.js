const express = require('express');
const app = express();
const dotenv = require('dotenv');   
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
app.use(cors());
//import route
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const detailsRoute = require('./routes/details');
const uploadRoute = require('./routes/upload');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT, 
{ useUnifiedTopology: true , useNewUrlParser: true},
() => console.log('connected to DB'));

//middleware
app.use(express.json());
//route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/user', detailsRoute);
app.use('/api/user', uploadRoute);



app.listen(8080, '192.168.0.106' || 'localhost', () => console.log('server up and responding'));

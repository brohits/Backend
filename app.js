const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//import Routes
const userRoutes= require('./routes/user')

//app
const app = express();

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('Connected to database'))

//routes middleware
app.use('/api',userRoutes);

const Port = process.env.PORT || 8000;

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`);
});
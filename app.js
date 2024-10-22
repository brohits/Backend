const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//app
const app = express();

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=> console.log('Connected to database'))

//routes
app.get('/', (req, res) => {
    res.send("hello from node");
});

const Port = process.env.PORT || 8000;

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`);
});
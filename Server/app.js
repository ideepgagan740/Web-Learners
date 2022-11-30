const dotenv=require("dotenv");
// const mongoose= require("mongoose");
const express = require("express");
const app= express();

dotenv.config({path:'./config.env'});

require("./db/conn")

app.use(express.json());
// const User= require('./models/userSchema');

// we link the router files to make our route easy
app.use(require("./router/auth"));

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})
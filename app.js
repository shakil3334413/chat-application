// Extranal import 
const express=require('express');
const dotenv=require('dotenv');
const mongose=require('mongoose');
const path=require('path');
const cookieParser=require('cookie-parser');
const moment = require("moment");
const http = require('http');

//internal import
const {errorHandler,notfoundHandler} =require('./middleware/common/errorMiddleware');
const loginRouter=require('./route/loginRouter');
const userRouter=require('./route/userRouter');
const inboxRouter=require('./route/inboxRouter');
const app=express();
const server = http.createServer(app);
dotenv.config();

// socket creation
const io = require("socket.io")(server);
global.io = io;

// set comment as app locals
app.locals.moment = moment;

//database connection 
mongose.connect(process.env.MONGO_COONECTION_STRING)
    .then(()=>console.log('Connection Successfully'))
    .catch((err)=>console.log(err));


// request parses
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname,"public")));

//cookie parser use
app.use(cookieParser(process.env.COOKIE_SECRET))


//router setup
app.use("/",loginRouter);
app.use("/users",userRouter);
app.use("/inbox",inboxRouter);

//notfoundhandler
app.use(notfoundHandler);

//common handler
app.use(errorHandler);

//server port running 
app.listen(process.env.PORT,()=>{
    console.log(`Server Running ${process.env.PORT}`);
})
const express= require('express');
const morgan = require('morgan');
const userRouter =require('./routers/userRouters');
const bodyParser=require('body-parser');

const app= express();

app.listen(443,()=>console.log('Server is running on port 443'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(userRouter);
// exposing the upload/images folder
app.use("/profile",express.static('uploads/images'));
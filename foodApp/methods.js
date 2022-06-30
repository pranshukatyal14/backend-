// wnbMlvH8KkdmQbbU

// const express=require('express');

// const app=express();
// // middleware function-> post, frontend->json
// app.use(express.json());
// app.listen(3000);

// let users={};


// // get
// app.get('/user',(req,res)=>{
//     res.send(users);
// })

// //post -> to send data from frontent to backend

// app.post('/user',(req,res)=>{
//     console.log(req.body);
//     users=req.body;
    
//     res.json({
//         message:"data received successfully",
//         user:req.body
//     });
// })

// // update 
// app.patch('/user',(req,res)=>{
//     console.log('req.body->',req.body);
//     //update data in users object
//     let dataToBeUpdated=req.body;
//     for(key in dataToBeUpdated){
//         users[key]=dataToBeUpdated[key];
//     }
//     res.json({
//         message:"data updated successfully"
//     })
// })

// app.delete('/user',(req,res)=>{
//     users={};
//     res.json({
//         message:"data has been deleted"
//     })
// })

const express=require("express");

const app=express();

// let mongoose=require('mongoose');

// const emailValidator=require('email-validator')
const cookieParser=require('cookie-parser')

//  middleware function -> post , frontend -> json 

app.use(express.json()); // global middlware

app.listen(3000);
app.use(cookieParser());
// let users=[
//     {
//         'id':1,
//         "name":'abhishek'
//     },
//     {
//         'id':2,
//         "name":'karan'
//     },
//     {
//         'id':3,
//         "name":'pranshu'
//     },
// ];
// app.get('/user',(req,res)=>{
//     console.log(req.query)
//     res.send(users)

// })

//  mini app
const userRouter=require('./Routers/userRouter');
const authRouter=require('./Routers/authRouter');


//  base route , router to use
app.use('/user',userRouter); // global middleware
app.use('/auth',authRouter); // global middleware
  







// app.get('/user',)

// app.post('/user',)

//  update -> patch
// app.patch('/user',)

//  to delete a data
// app.delete('/user',)

//  params
// app.get('/user/:username',(req,res)=>{
//     console.log(req.params.username)
//     console.log(req.params)

//     res.send("user id received");
// })





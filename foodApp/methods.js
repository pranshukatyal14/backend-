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
const userModel=require('./models/userModel')

let mongoose=require('mongoose');

const emailValidator=require('email-validator')
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
const userRouter=express.Router();
const authRouter=express.Router();


//  base route , router to use
app.use('/user',userRouter); // global middleware
app.use('/auth',authRouter); // global middleware


userRouter
.route('/')
.get(getUsers) // path specific middlware
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/getCookies')
.get(getCookies);

userRouter
.route('/setCookies')
.get(setCookies);

userRouter
.route('/:id')
.get(getUserById)


authRouter
.route('/signup')
.get(middleware1,getSignup,middleware2)
.post(postSignup)






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

async function getUsers(req,res){
    // console.log(req.query);
    let allUsers=await userModel.find();
    let user=await userModel.findOne({name:'Abhishek'});


    res.json({
        message:"list of all users",
        data:allUsers
    });
}

function postUser(req,res){
    console.log(req.body);
    user=req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    })
};

async function updateUser(req,res){
    
        console.log('req.body -> data',req.body);
        //  update data in users object
        let dataToBeUpdated=req.body;
        let user=await userModel.findOneAndUpdate({email:'abc@gmail.com'},dataToBeUpdated);
        // for(key in dataToBeUpdated){
        //     users[key]=dataToBeUpdated[key]
        // }
        res.json({
            message:"data updated successfully",
            data:user
        })
}

async function deleteUser(req,res){
    let dataToBeDeleted=req.body;
    let user=await userModel.findOneAndDelete(dataToBeDeleted)
        // users={};
        res.json({
            message:"data has been deleted",
            data:user
        })
    
}

function getUserById(req,res){
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i]
        }
    }
    res.json({
        message:"req received",
        data:obj
    });
}

function middleware1(req,res,next){
    console.log("middleware1 encounterred");
    next();
}
function middleware2(req,res){
    console.log("middleware2 encounterred");
    // next();
   
      console.log("middleware2 ended req/rees cycle")
   

    res.sendFile('./public/index.html',{root:__dirname});

}


function getSignup(req,res,next){
   
    console.log("getuser called")
    // res.sendFile('./public/index.html',{root:__dirname});
    next();
    
}
 async function postSignup(req,res){
    // let obj=req.body;
    let dataObj=req.body;
    let user=await userModel.create(dataObj)
    // console.log('backend',obj)
    res.json({
        message:"user signed up",
        data:user
    })

}

function setCookies(req,res){
    // res.setHeader('Set-Cookie','isLoggedIn=true');
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true, httpOnly:true});
    res.cookie('isPrimeMember',true);


    res.send('cookies has been set');
}

function getCookies(req,res){
    let cookies=req.cookies;
    console.log(cookies);
    res.send('cookies recieived')
}

const express=require("express");
const authRouter=express.Router();

const userModel=require('../models/userModel')
const cookieParser=require('cookie-parser');
const { trimStart } = require("lodash");
// app.use('/auth',authRouter); // global middleware


authRouter
.route('/signup')
.get(middleware1,getSignup,middleware2)
.post(postSignup)

authRouter
.route('/login')
.post(loginUser)


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

async function loginUser(req,res){
    try{

   

   
   let data=req.body;
   if(data.email){

   
    let user=await userModel.findOne({email:data.email});
    if(user){
        //  bcrypt -> compare 
        if(user.password==data.password){
            res.cookie('isLoggedIn',true,
            {httpOnly:true});
            return res.json({
                message:"user has logged in",
                userDetails:data
            })
        }else{
            return res.json({
                message:"wrong credentials"
            })
        }
    }
    else{
        return res.json({
            message:"user not found"
        })
    }
    }else{
        return res.json({
            message:"Empty field found"
        })
    }
    }

    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
    
}




module.exports=authRouter
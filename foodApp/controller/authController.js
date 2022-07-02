const express=require("express");

const userModel=require('../models/userModel')

const jwt=require('jsonwebtoken')
// const JWT_KEY='asdfasfaedfn213423'
const JWT_KEY=require('../secrets')


//  sign up user
module.exports.signup=async function signup(req,res){

    try{

   
    // let obj=req.body;
    let dataObj=req.body;
    let user=await userModel.create(dataObj)
    // console.log('backend',obj)
    if(user){

        return res.json({
            message:"user signed up",
            data:user
        })
    }else{
        res.json({
            message:"error while signing up"
        })
    }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }

}

//  login user 

module.exports.login=async function loginUser(req,res){
    try{

   let data=req.body;
   if(data.email){

    let user=await userModel.findOne({email:data.email});
    if(user){
        //  bcrypt -> compare 
        if(user.password==data.password){
            let uid=user['_id']; //uid
            let token=jwt.sign({payload:uid},JWT_KEY);


            // res.cookie('isLoggedIn',true,
            // {httpOnly:true});


            
            res.cookie('login',token,
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

//  isAuthorized -> to check the user's role [admin, restaurant, deliveryboy]

module.exports.isAuthorised=function isAuthorised(roles){
    return function (req,res,next){
        if(roles.include(req.role)==true){
            next();
        }else{
            res.status(401).json({
                message:"operation not allowed"
            })
        }
    }
}

//  protectroute

module.exports.protectRoute=async function protectRoute(req,res,next){
    try{

   
    let token;
    if(req.cookies.login){
        console.log(req.cookies);
        token=req.cookies.login;
        let payload=jwt.verify(token,JWT_KEY);
        if(payload){

            const user=await userModel.findById(payload.payload);
            req.role=user.role;
            req.id=user.id;
           next();
        }
             
        else{
            return res.json({
                message:"please login again"
            })
        }
    }else{
        return res.json({
            message:"please login "
        })
    }
}
catch(err){
    res.json({
        message:err.message
    })
}
}


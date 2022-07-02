const express=require("express");
const userRouter=express.Router();

// const userModel=require('../models/userModel')
// app.use('/user',userRouter); // global middleware
const protectRoute=require('./authHelper');

const {getUser,getAllUser,updateUser,deleteUser}=require('../controller/userController')

// for learning purpose

// userRouter
// .route('/')
// .get(protectRoute,getUsers) // path specific middlware
// .post(postUser)
// .patch(updateUser)
// .delete(deleteUser);

// userRouter
// .route('/getCookies')
// .get(getCookies);

// userRouter
// .route('/setCookies')
// .get(setCookies);

// userRouter
// .route('/:id')
// .get(getUserById)

//  actual project

// user ke options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

//  profile page
app.use(protectRoute)

userRouter
.route('/userProfile')
.get(getUser)

// admin specific function

app.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUser)


module.exports=userRouter;
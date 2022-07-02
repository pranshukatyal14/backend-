const express=require("express");
const userRouter=express.Router();

// const userModel=require('../models/userModel')
// app.use('/user',userRouter); // global middleware
// const protectRoute=require('./authHelper');
const app=express();

const {getUser,getAllUser,updateUser,deleteUser}=require('../controller/userController')

// const {signup,login,protectRoute,isAuthorised,resetPasword,forgetPasword}=require('../controller/authController')

const {signup,login,isAuthorised,protectRoute}=require('../controller/authController')

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


userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)


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
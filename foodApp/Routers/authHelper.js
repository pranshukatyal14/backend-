// let flag=false; // user logged in or not
function protectRoute(req,res,next){
    if(req.cookies.isLoggedIn){
        next();
    }else{
        return res.json({
            message:"operation not alloed "
        })
    }
}

module.exports=protectRoute;
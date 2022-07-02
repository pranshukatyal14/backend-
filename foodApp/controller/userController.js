const userModel=require('../models/userModel')


model.exports.getUsers=async function getUsers(req,res){
    // console.log(req.query);
    let allUsers=await userModel.find();
    let user=await userModel.findOne({name:'Abhishek'});


    res.json({
        message:"list of all users",
        data:allUsers
    });
}

model.exports.postUser=function postUser(req,res){
    console.log(req.body);
    user=req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    })
};

model.exports.updateUser=async function updateUser(req,res){
    
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

model.exports.deleteUser=async function deleteUser(req,res){
    let dataToBeDeleted=req.body;
    let user=await userModel.findOneAndDelete(dataToBeDeleted)
        // users={};
        res.json({
            message:"data has been deleted",
            data:user
        })
    
}

model.exports.getUserById=function getUserById(req,res){
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


// function setCookies(req,res){
//     // res.setHeader('Set-Cookie','isLoggedIn=true');
//     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true, httpOnly:true});
//     res.cookie('isPrimeMember',true);


//     res.send('cookies has been set');
// }

// function getCookies(req,res){
//     let cookies=req.cookies;
//     console.log(cookies);
//     res.send('cookies recieived')
// }


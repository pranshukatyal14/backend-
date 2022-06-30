
// mongodb


let mongoose=require('mongoose');

const emailValidator=require('email-validator')

const bcrypt=require('bcrypt');
const db_link='mongodb+srv://admin:wnbMlvH8KkdmQbbU@cluster0.yuqnika.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
    // console.log(db)
    console.log('db connected')

})
.catch(function(err){
    console.log(err)
});


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
        
    },
    password:{
        type:String,
        required:true,
        minLength:8

    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password
        }

    }
});

//  hooks pre and post
//  before save event occurs in db

// userSchema.pre('save',function(){
//     console.log('before saving in db',this)
// });



// after save event occurs in db

// userSchema.post('save',function(doc){
//     console.log('after saving in db',doc)
// })

//  remove - explore on own


userSchema.pre('save',function(){
    this.confirmPassword=undefined;
});

// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     // console.log(hashedString);
//     this.password=hashedString;
// })


// model
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;

// (async function createUser(){
//     let user={
//         name:'pranshu',
//         email:'abcd@gmail.com',
//         password:'12345678',
//         confirmPassword:'12345678'
//     };

//     let data=await userModel.create(user);
//     console.log(data);


// })();


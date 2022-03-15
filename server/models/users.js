const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        unique:true
    },
    password:String
});

module.exports=mongoose.model('users',userSchema);
const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    category:String,
    description:String,
    application:String,
    features:String,
    filename : {
        type : String,
        unique : true,
        required: true
    },
    contentType : {
        type: String,
        required : true
    },
    imageBase64 : {
        type : String,
        required: true
    }
});

module.exports=mongoose.model('products',productSchema);




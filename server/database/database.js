const mongoose = require('mongoose');
require("dotenv").config();

const URL=`mongodb+srv://admin:admin@cluster0.d1efi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connection = mongoose.connect(URL,
    {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('Connected To Mongoose');
    }).catch(()=>{
        console.log('Something Went Wrong');
    })

module.exports=connection;
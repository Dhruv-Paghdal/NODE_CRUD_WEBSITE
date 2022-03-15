const mongoose = require('mongoose');
const Products = require("../models/products");
const nodeMailer=require('nodemailer');
require("dotenv").config();

let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.USER_EMAIL, 
      pass: process.env.USER_PASSWORD, 
    }
});

let conveyorImage;
let labellingImage;
let fillingImage;
let batteryImage;
let feederImage;
let shrinkImage;
let otherImage;

let conveyorDetail=new Array;
let labellingDetail=new Array;
let fillingDetail=new Array;
let batteryDetail=new Array;
let feederDetail=new Array;
let shrinkDetail=new Array;
let otherDetail=new Array;

// let conveyorData;
// let labellingData;
// let fillingData;
// let batteryData;
// let feederData;
// let shrinkData;
// let otherData;

let loading=true;

let productDetails=()=>{
    Products.find({category:'Conveyor'}).then((result)=>{
        for (let index = 0; index < result.length; index++) {
            conveyorDetail.push(
                {
                    name:result[index].name,
                    description:result[index].description,
                    application:result[index].application,
                    features:result[index].features,
                    contentType:result[index].contentType,
                    imageBase64:result[index].imageBase64
                }
            )  
        }   
    }).catch((err)=>{console.log(err)});

    Products.find({category:'Battery Machines'}).then((result)=>{
        for (let index = 0; index < result.length; index++) {
            batteryDetail.push(
                {
                    name:result[index].name,
                    description:result[index].description,
                    application:result[index].application,
                    features:result[index].features,
                    contentType:result[index].contentType,
                    imageBase64:result[index].imageBase64
                }
            )  
        }   
    }).catch((err)=>{console.log(err)});

    Products.find({category:'Liquid Filling Machine'}).then((result)=>{
        for (let index = 0; index < result.length; index++) {
            fillingDetail.push(
                {
                    name:result[index].name,
                    description:result[index].description,
                    application:result[index].application,
                    features:result[index].features,
                    contentType:result[index].contentType,
                    imageBase64:result[index].imageBase64
                }
            )  
        }   
    }).catch((err)=>{console.log(err)});
    
    Products.find({category:'Feeder Machine'}).then((result)=>{
        for (let index = 0; index < result.length; index++) {
            feederDetail.push(
                {
                    name:result[index].name,
                    description:result[index].description,
                    application:result[index].application,
                    features:result[index].features,
                    contentType:result[index].contentType,
                    imageBase64:result[index].imageBase64
                }
            )  
        }   
    }).catch((err)=>{console.log(err)});
    
    Products.find({category:'Labelling Machine'}).then((result)=>{
        for (let index = 0; index < result.length; index++) {
            labellingDetail.push(
                {
                    name:result[index].name,
                    description:result[index].description,
                    application:result[index].application,
                    features:result[index].features,
                    contentType:result[index].contentType,
                    imageBase64:result[index].imageBase64
                }
            )  
        }   
    }).catch((err)=>{console.log(err)});
    
    Products.find({category:'Shrink Machine'}).then((result)=>{
        for (let index = 0; index < result.length; index++) {
            shrinkDetail.push(
                {
                    name:result[index].name,
                    description:result[index].description,
                    application:result[index].application,
                    features:result[index].features,
                    contentType:result[index].contentType,
                    imageBase64:result[index].imageBase64
                }
            )  
        }   
    }).catch((err)=>{console.log(err)});

    Products.find({category:'Other Machineries'}).then((result)=>{
        for (let index = 0; index < result.length; index++) {
            otherDetail.push(
                {
                    name:result[index].name,
                    description:result[index].description,
                    application:result[index].application,
                    features:result[index].features,
                    contentType:result[index].contentType,
                    imageBase64:result[index].imageBase64
                }
            )  
        }   
    }).catch((err)=>{console.log(err)});
}

let images=()=>{  
    Products.findOne({name:'Belt Conveyor'}).then((result)=>{
        conveyorImage={
            contentType:result.contentType,
            imageBase64:result.imageBase64
        }
    }).catch((err)=>{console.log(err);})

    Products.findOne({name:'Flat Bottle Labelling Machine'}).then((result)=>{
        labellingImage={
            contentType:result.contentType,
            imageBase64:result.imageBase64
        }
    }).catch((err)=>{console.log(err);})

    Products.findOne({name:'2 Head Liquid Filling Machine'}).then((result)=>{
        fillingImage={
            contentType:result.contentType,
            imageBase64:result.imageBase64
        }
    }).catch((err)=>{console.log(err);})

    Products.findOne({name:'Battery Washing Machine'}).then((result)=>{
        batteryImage={
            contentType:result.contentType,
            imageBase64:result.imageBase64
        }
    }).catch((err)=>{console.log(err);})

    Products.findOne({name:'Carton Feeder'}).then((result)=>{
        feederImage={
            contentType:result.contentType,
            imageBase64:result.imageBase64
        }
    }).catch((err)=>{console.log(err);})

    Products.findOne({name:'PFA Shrink Tunnel'}).then((result)=>{
        shrinkImage={
            contentType:result.contentType,
            imageBase64:result.imageBase64
        }
    }).catch((err)=>{console.log(err);})

    Products.findOne({name:'Strech Wrapping Machine'}).then((result)=>{
        otherImage={
            contentType:result.contentType,
            imageBase64:result.imageBase64
        }
    }).catch((err)=>{console.log(err);}) 
    
}

images();
productDetails();

exports.home=(req,res)=>{
    res.render('main',{layout:"home",conveyorImage,labellingImage,fillingImage,batteryImage})
}

exports.services=(req,res)=>{
    res.render('services',{layout:"home",conveyorImage,labellingImage,fillingImage,batteryImage,feederImage,shrinkImage,otherImage})
}

exports.products=(req,res)=>{
    res.render('products',{layout:"home",conveyorDetail,batteryDetail,labellingDetail,fillingDetail,feederDetail,shrinkDetail,otherDetail})
}

exports.about=(req,res)=>{
    res.render('about',{layout:"home"})
}

exports.sendEnquiry=(req,res)=>{
    let enquiry=req.body.requirement;
    let buyerName=req.body.buyerName;
    let email=req.body.email;
    let mobile=req.body.mobile;

    transporter.sendMail({
        from: '"Machine Enquiry" bossbig2654@gmail.com', 
        to: "dhruvpaghdal2@gmail.com", 
        subject: "Enquiry For HK Industires", 
        text: `Dear HK Industires,
${enquiry}.

Call Us On:-
+91-${mobile}

Mail Us on:-
${email}

Regards,
${buyerName}.`
    }).then((result)=>{console.log(result);}).catch((err)=>{console.log(err);});
    
    res.redirect('/products');
}




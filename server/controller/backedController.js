const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fs = require('fs');
const Products = require("../models/products");
const Users = require("../models/users");

const JWTstr="!@32#$%";
let login=false;

// Login Page Route
exports.backend=(req,res)=>{
    res.render('login',{layout : 'index'});
}

// Authentication Route
exports.loginCheck=async (req,res)=>{

    let email=req.body.email;
    let password=req.body.password;

    try {

        let user=await Users.find({email});
        let comparePassword= bcrypt.compareSync(password,user[0].password);

        if(comparePassword){
            let token=await jwt.sign({email}, JWTstr, { expiresIn: '1800s' });
            res.cookie("access-token", token,{expire: 1800000 + Date.now()});
            login=true;
            res.status(200).redirect('/backend/home');
        }
        else{
            res.status(401).json({Error:"Login With Correct Credentials"});
        }
        
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"});
        console.log({error});
    }

}

// Backend Home Route
exports.backendHome=(req,res)=>{
    res.render('backendMain',{layout : 'index',login});
}

// Add New Product Route
exports.addProduct=(req,res)=>{
    res.render('addProduct',{layout : 'index',login});
}

// Send Data Of Newly Added Product Route
exports.sendData=async (req,res)=>{

    let data=req.body;
    let files=req.files;

    try {
    
        let newImage=files.map((file)=>{

            let bufferImage=fs.readFileSync(file.path);
            let encodImage=bufferImage.toString('base64');
    
            return encodImage;
        });

        let addPro=await new Products({

            _id:new mongoose.Types.ObjectId(),
            name:data.productName,
            category:data.productCategory,
            description:data.productDesc,
            application:data.productApp,
            features:data.productFea,
            filename:files[0].originalname,
            contentType:files[0].mimetype,
            imageBase64:newImage[0]

        });

        let addProduct = await addPro.save();

        if(addProduct){
            res.status(201).redirect("/backend/home");  
        }
        else{
            res.status(500).json({Error:"Internal Server Error"});
        }

    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"});
        console.log({error});
    }

}

// Edit Page Route
exports.editProduct=(req,res)=>{
    res.render('editProduct',{layout : 'index',login});
}

// Select Existing Product For Edit Route
exports.selectProduct=async(req,res)=>{
    
    let category=req.body.productCategory;

    try {

        let data = await Products.find({category})
    
        if(data){
            let cats=data.map((ele)=>{
                return {
                    id:ele._id,
                    name:ele.name,
                    category:ele.category,
                    description:ele.description,
                    application:ele.application,
                    features:ele.features,
                    contentType:ele.contentType,
                    imageBase64:ele.imageBase64
                };
            });
            res.status(200).render('displayProduct',{layout:'index',cats,login});
        }
        else{
            res.status(200).render('displayProduct',{layout:'index',login});
        }

    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"});
        console.log({error});
    }
    
}

// Delete The Existing Product Route
exports.deleteProduct=async (req,res)=>{

    let id=req.params.id;

    try {
        let delProduct=await Products.findByIdAndDelete(id);

        if(delProduct){
            res.status(201).redirect("/backend/home");  
        }
        else{
            res.status(500).json({Error:"Internal Server Error"});
        }

    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"});
        console.log({error});
    }
    
}

// Update The Existing Product Route
exports.updateProduct=async (req,res)=>{

    let id=req.params.id;

    try {

        let product = await Products.findById(id);
        let {name,category,description,application,features,contentType,imageBase64,filename}=product;
        name=name.split(" ").toString().replace(/,/g,"&nbsp;");

        res.status(200).render('updateProduct',{layout:'index',id,name,category,description,application,features,contentType,imageBase64,filename,login});

    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"});
        console.log({error});
    }
        
}

// Send Update Data Of The Existing Product Route
exports.sendUpdate=async (req,res)=>{

    let id=req.params.id;

    try {

        let product = await Products.findById(id);

        if(product){
            let data=req.body;
            let files=req.files;
    
            let newProduct={
                name:data.productName,
                category:data.productCategory,
                description:data.productDesc,
                application:data.productApp,
                features:data.productFea
            };
    
            if(files.length){
                let newImage=files.map((file)=>{
                    let bufferImage=fs.readFileSync(file.path);
                    let encodImage=bufferImage.toString('base64');
                    return encodImage;
                });
    
                newProduct={
                    ...newProduct,
                    filename:files[0].originalname,
                    contentType:files[0].mimetype,
                    imageBase64:newImage[0]
                };
            }

            let updateProduct=await Products.findByIdAndUpdate(id,{$set:newProduct},{new:true});

            if(updateProduct){
                res.status(200).redirect("/backend/home");
            }
            else{
                res.status(500).json({Error:"Internal Server Error"});
            }
        }
        else{
            res.status(404).json({Error:"Product Not Found."});
        }

    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"});
        console.log({error});
    }

}

// Logout Route
exports.logout=(req,res)=>{
    res.clearCookie("access-token");
    login=false;
    res.redirect("/backend");
}
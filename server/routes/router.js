const express = require('express');
const route = express.Router();
const backedController = require('../controller/backedController');
const frontendController = require('../controller/frontendController');
const store = require('../middleware/multer');
const cookie=require('../middleware/cookieChecker');
const cors=require('../middleware/cors');

// Frontend Routes
route.get("/",cors,frontendController.home);
route.get("/services",cors,frontendController.services);
route.get("/products",cors,frontendController.products);
route.get("/about",cors,frontendController.about);
route.post("/sendEnquiry",cors,frontendController.sendEnquiry);

// Backend Routes
route.get("/backend",cors,backedController.backend);
route.post("/loginCheck",cors,backedController.loginCheck);
route.get("/backend/home",cookie,cors,backedController.backendHome);
route.get("/backend/addProduct",cookie,cors,backedController.addProduct);
route.get("/backend/editProduct",cookie,cors,backedController.editProduct);
route.post("/sendData",store.array('productImg'),cookie,cors,backedController.sendData);
route.post("/backend/editProduct/selectProduct",cookie,cors,backedController.selectProduct);
route.delete("/backend/editProduct/deleteProduct/:id",cookie,cors,backedController.deleteProduct);
route.get("/backend/editProduct/updateProduct/:id",cookie,cors,backedController.updateProduct);
route.post("/sendUpdate/:id",store.array('productImg'),cookie,cors,backedController.sendUpdate);
route.get("/backend/logout",cors,backedController.logout);

module.exports=route;

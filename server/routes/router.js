const express = require('express');
const route = express.Router();
const backedController = require('../controller/backedController');
const frontendController = require('../controller/frontendController');
const store = require('../middleware/multer');
const cookie=require('../middleware/cookieChecker');

// Frontend Routes
route.get("/",frontendController.home);
route.get("/services",frontendController.services);
route.get("/products",frontendController.products);
route.get("/about",frontendController.about);
route.post("/sendEnquiry",frontendController.sendEnquiry);

// Backend Routes
route.get("/backend",backedController.backend);
route.post("/loginCheck",backedController.loginCheck);
route.get("/backend/home",cookie,backedController.backendHome);
route.get("/backend/addProduct",cookie,backedController.addProduct);
route.get("/backend/editProduct",cookie,backedController.editProduct);
route.post("/sendData",store.array('productImg'),cookie,backedController.sendData);
route.post("/backend/editProduct/selectProduct",cookie,backedController.selectProduct);
route.delete("/backend/editProduct/deleteProduct/:id",cookie,backedController.deleteProduct);
route.get("/backend/editProduct/updateProduct/:id",cookie,backedController.updateProduct);
route.post("/sendUpdate/:id",store.array('productImg'),cookie,backedController.sendUpdate);
route.get("/backend/logout",backedController.logout);

module.exports=route;

const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth");
const IsSeller = require("../middleware/auth");
const { createOrder,getSellerOrder,getUserOrder,getAccountInfo,createTx } = require("../controllers/orderController");

router.post("/", Auth, createOrder);
router.get("/seller-orders",Auth,IsSeller,getSellerOrder) //Seller orders
router.get("/user-orders",Auth,getUserOrder)  //USer orders

//coinpayment
router.get("/acc-info",getAccountInfo) //get admin info
router.post("/create-tx",Auth,createTx) //create tx


module.exports = router;

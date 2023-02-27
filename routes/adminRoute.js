const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  addUser,
  approveSeller,
  depositMoney,
  deductMoney,
  getUsers,
  getOrders,
  getBillings,
  deleteUser,
  updateOrder,
  depositMoneyToSellerWallet,
  blockUser,
  depositMoneyUser
} = require("../controllers/adminController");
const IsAdmin = require("../middleware/IsAdmin")
const {createCard} = require("../controllers/cardController");
const Auth = require("../middleware/auth")

router.post("/create-card", Auth, IsAdmin, createCard);
router.post("/register-admin", registerAdmin);
router.post("/approve-seller", approveSeller);
router.post("/add-user", addUser);
router.post("/deposit-money", depositMoney);
router.post("/deduct-money", deductMoney);
router.get("/users", getUsers);
router.get("/orders", getOrders);
router.get("/billings", getBillings);
router.delete('/delete-user/:id',deleteUser)
router.post("/update-order", updateOrder);
router.post("/deposit-money-seller",depositMoneyToSellerWallet)
router.post("/block-user",blockUser)
router.post("/deposit-money-user",depositMoneyUser)

module.exports = router;

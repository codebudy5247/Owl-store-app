const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  approveSeller,
  depositMoney,
  deductMoney,
  getUsers,
  getOrders,
  getBillings,
  deleteUser
} = require("../controllers/adminController");

router.post("/register-admin", registerAdmin);
router.post("/approve-seller", approveSeller);
router.post("/deposit-money", depositMoney);
router.post("/deduct-money", deductMoney);
router.get("/users", getUsers);
router.get("/orders", getOrders);
router.get("/billings", getBillings);
router.delete('/delete-user/:id',deleteUser)





module.exports = router;

const express = require("express");
const router = express.Router();
const WithdrawalModel = require("../models/withdrawalModel");
const OrderModel = require("../models/orderModel");
const Auth = require("../middleware/auth");
const User = require("../models/userModel")

router.post("/", Auth, async (req, res) => {
  const { amount,paymentAddress } = req.body;
  const newWithdrawalRequest = new WithdrawalModel({
    amount: amount,
    // orderId: orderId,
    paymentAddress:paymentAddress,
    createdBy: req.user._id,
  });
  try {
    const withdrawal = await newWithdrawalRequest.save();
    //deduct amount from seller wallet
    let recipient = await User.findById(req.user._id);
    let updateFields = {};
    let moneyToDeposit = recipient.walletBalance - amount * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res
      .status(201)
      .send({ message: "New Withdrawal Request Created", withdrawal,user });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

//Get all Withdrawal Request
router.get("/", async (req, res) => {
  try {
    const withdrawalRequests = await WithdrawalModel.find({});
    res.status(200).json(withdrawalRequests);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;

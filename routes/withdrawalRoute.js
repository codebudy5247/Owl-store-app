const express = require("express");
const router = express.Router();
const WithdrawalModel = require("../models/withdrawalModel");
const OrderModel = require("../models/orderModel");
const Auth = require("../middleware/auth");

router.post("/", Auth, async (req, res) => {
  const { amount, orderId,paymentAddress } = req.body;
  const newWithdrawalRequest = new WithdrawalModel({
    amount: amount,
    orderId: orderId,
    paymentAddress:paymentAddress,
    createdBy: req.user._id,
  });
  try {
    const withdrawal = await newWithdrawalRequest.save();
    res
      .status(201)
      .send({ message: "New Withdrawal Request Created", withdrawal });
    let updateOrderFields = {};
    updateOrderFields.withdrawalRequestCreated = true;
    let order = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      { $set: updateOrderFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
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

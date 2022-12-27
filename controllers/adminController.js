const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Order = require("../models/orderModel");
const Billing = require("../models/billingModel");
//Register Admin
exports.registerAdmin = async (req, res) => {
  const { username, email_id, password } = req.body;
  try {
    const oldUser = await User.findOne({ email_id });

    if (oldUser)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username,
      email_id,
      password: hashedPassword,
      role: "ROLE_ADMIN",
    });

    const token = jwt.sign(
      { email: result.email, id: result._id, role: result.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "11h",
      }
    );

    res.status(201).json({ result, token, msg: "Registered successfull!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//Approved seller
exports.approveSeller = async (req, res) => {
  try {
    const { userId } = req.body;
    let updateFields = {};
    updateFields.approvedByAdmin = true;
    let user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ message: "Seller Approved!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users: users });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ orders: orders });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Get all billings
exports.getBillings = async (req, res) => {
  try {
    const billings = await Billing.find();
    res.json({ billings: billings });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
//Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    await User.findByIdAndRemove(req.params.id);

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Payment approved / deposit balance
exports.depositMoney = async (req, res) => {
  try {
    const { amount, userId } = req.body;
    let recipient = await User.findById(userId);
    let updateFields = {};
    let moneyToDeposit = recipient.walletBalance + amount * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res
      .status(200)
      .send({ message: `Deposited ${amount}$ to ${user?.username}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Deduct amount after checkout
exports.deductMoney = async (req, res) => {
  try {
    const { amount, userId, orderId } = req.body;
    let recipient = await User.findById(userId);
    let updateFields = {};
    let moneyToDeposit = recipient.walletBalance - amount * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    let updateOrderFields = {};
    updateOrderFields.isPaid = true;
    let order = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: updateOrderFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ message: "success!", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//withdrawal request
const Order = require("../models/orderModel");
const Coinpayments = require("coinpayments");
const User = require("../models/userModel");

const client = new Coinpayments({
  key: process.env.PUBLIC_KEY,
  secret: process.env.SECRET_KEY,
});

//create order
exports.createOrder = async (req, res) => {
  const { items, status, payWith, totalPrice } = req.body;
  let loggedInUser = await User.findById(req.user._id);
  if (loggedInUser.walletBalance < totalPrice)
    return res.status(500).json({ message: "You dont have enough balance." });
  const newOrder = new Order({
    seller: req.body.items[0].itemId.createdBy,
    items: items.map((x) => ({ item: x.itemId })),
    payWith,
    totalPrice,
    user: req.user._id,
    status,
  });
  try {
    const order = await newOrder.save();
    //deposit money to seller account
    let depositPercent = 80;
    let amountToDeposit = (depositPercent / 100) * order.totalPrice;
    let recipient = await User.findById(order.seller);
    let updateFields = {};
    let moneyToDeposit = recipient.walletBalance + amountToDeposit * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: recipient._id },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(201).send({ message: "New Order Created", order });
    let user1 = req.user;
    if (user1) {
      user1.clearCart();
    }
  } catch (error) {
    console.log(error);
  }
};

//Refund Money {CARD === 'DECLINED'}
exports.refundUser = async (req, res) => {
  try {
    const { OrderId, amount } = req.body;
    let order = await Order.findById(OrderId);
    let recipient = await User.findById(order.user);

    //Deposit amount to user wallet
    let updateFields = {};
    let moneyToDeposit = recipient.walletBalance + amount * 1;
    updateFields.walletBalance = moneyToDeposit;
    let user = await User.findOneAndUpdate(
      { _id: order.user },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    //Deduct amount from seller wallet
    let seller = await User.findById(order.seller);
    let sellerWalletBal = seller.walletBalance;
    let updateSeller = {};
    let deductAmount = sellerWalletBal - amount * 1;
    updateSeller.walletBalance = deductAmount;
    let slr = await User.findOneAndUpdate(
      { _id: order.seller },
      { $set: updateSeller },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ message: "Refunded!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user order
exports.getUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get seller order
exports.getSellerOrder = async (req, res) => {
  try {
    const seller = req.query.seller || "";
    const sellerFilter = seller ? { seller } : {};
    const orders = await Order.find({ ...sellerFilter });
    res.send(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update order status

//Payment Integration

//Admin account info.
exports.getAccountInfo = async (req, res) => {
  try {
    const info = await client.getBasicInfo();
    const accountBalance = await client.balances({ all: "0" }); //{ all: "1"} get all coins balance
    const depositAddress = await client.getDepositAddress({ currency: "BTC" }); //{currency:"BTC"} - Any enabled currency. e.g 'BTC'
    res.status(200).json({
      AccountInfo: info,
      AccountBalance: accountBalance,
      DepositAddress: depositAddress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create Tx
exports.createTx = async (req, res) => {
  try {
    const { orderId, cur1, cur2, amount, buyers_email, buyers_name } = req.body;
    const depositAddress = await client.getDepositAddress({ currency: "BTC" });

    let options = {
      cmd: "create_transaction",
      currency1: cur1,
      currency2: cur2,
      amount: amount,
      buyer_email: buyers_email,
      address: depositAddress,
      buyer_name: buyers_name,
    };

    let create_payment = await client.createTransaction(options);
    let updateFields = {};
    updateFields.tx_id = create_payment.txn_id;
    let order = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: updateFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    let user = req.user;
    if (user) {
      user.clearCart();
    }
    res.status(201).send({ message: "New Tx Created", create_payment, order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// //Get Tx info
// exports.txInfo = async (req, res) => {
//   const { txID } = req.body;
//   try {
//     let transaction_info = await client.getTx({ txid: txID });
//     res.status(200).send({ message: "Tx info...", transaction_info });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

//Get multiple tx status

//Get a list of tx ids

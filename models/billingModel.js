const { string } = require("joi");
const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
    },
    paymentApproved: {
      type: String,
      enum: ["pending", "approved", "decline"],
      default: "pending",
    },
    txId: {
      type: String,
    },
    amount: {
      type: String,
    },
    recipientAddress: {
      type: String,
    },
    checkoutUrl: {
      type: String,
    },
    statusUrl: {
      type: String,
    },
    payWith: {
      type: String,
      enum: ["BTC", "LTC", "USDT"],
      default: "BTC",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Billing", BillingSchema);

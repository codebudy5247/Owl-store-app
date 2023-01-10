const { string, boolean } = require("joi");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        item: { type: Object, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["Placed", "Cancelled", "Completed"],
      default: "Placed",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    payWith:{
      type: String,
      enum: ["BTC", "LTC", "USDT"],
      default: "BTC",
    },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    tx_id:{
      type:String
    },
    withdrawalRequestCreated:{
      type:Boolean,
      default:'false'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

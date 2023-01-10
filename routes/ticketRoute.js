const express = require("express");
const router = express.Router();
const ticketModel = require("../models/ticketModel");
const Auth = require("../middleware/auth");
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", Auth, async (req, res) => {
  try {
    const information = req.body;

    const ticket = await ticketModel.create({
      ...information,
      createdBy: req.user,
    });
    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

//Get all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await ticketModel.find({});
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

//Get user tickets
router.get("/user-tickets", Auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await User.aggregate([
      {
        $match: {
          _id: ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "tickets", //must be collection name for ticket
          localField: "_id",
          foreignField: "createdBy",
          as: "Tickets",
        },
      },
    ]);
    if (result.length > 0) {
      res.send(result[0].Tickets);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
module.exports = router;

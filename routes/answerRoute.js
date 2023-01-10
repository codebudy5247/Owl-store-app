const express = require("express");
const router = express.Router();
const answerModel = require("../models/answerModel");
const ticketModel = require("../models/ticketModel");

router.post("/", async (req, res) => {
  try {
    const { ticketId, content } = req.body;

    const ticket = await ticketModel.findById(ticketId);
    if (!ticket)
      return res.status(400).json({ msg: "This ticket does not exist." });

    const newAnswer = new answerModel({
      content,
      ticketId,
    });

    await ticketModel.findOneAndUpdate(
      { _id: ticketId },
      {
        $push: { reply: newAnswer },
      },
      { new: true }
    );

    await newAnswer.save();

    res.json({ newAnswer });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

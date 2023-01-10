const express = require("express");
const router = express.Router();
const rulesModel = require("../models/rulesModel");

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newRules = new rulesModel({
      title,
      content,
    });
    const rules = await newRules.save();
    res.json(rules);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const rules = await rulesModel.find({});
    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rules = await rulesModel.findById(req.params.id);
    if (!rules) return res.status(404).json({ msg: "rules not found" });
    await rules.findByIdAndRemove(req.params.id);
    res.json({ msg: "rules removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;

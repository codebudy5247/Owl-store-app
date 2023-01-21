const express = require("express");
const router = express.Router();
const newsModel = require("../models/newsModel");

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNews = new newsModel({
      title,
      content,
    });
    const news = await newNews.save();
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const news = await newsModel.find({});
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const news = await newsModel.findById(req.params.id);
    if (!news) return res.status(404).json({ msg: "News not found" });
    await news.findByIdAndRemove(req.params.id);
    res.json({ msg: "news removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;

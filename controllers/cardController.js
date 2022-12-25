const Card = require("../models/cardModel");
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

//create card
exports.createCard = async (req, res) => {
  const information = req.body;
  const newCard = new Card({
    ...information,
    createdBy: req.user,
  });
  try {
    await newCard.save();
    res.status(201).json({
      message: "Item created!",
      item: newCard,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//get all cards
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).json(cards);

    //   const page = parseInt(req.query.page) - 1 || 0;
    //   const limit = parseInt(req.query.limit) || 10;
    //   const search = req.query.search || "";
    //   let sort = req.query.sort || "base";
    //   let extraField = req.query.genre || "All";

    //   const extraFieldOptions = ["SSN", "email", "MMN", "DOB", "phone", "VBV"];

    //   extraField === "All"
    //     ? (extraField = [...extraFieldOptions])
    //     : (extraField = req.query.extraField.split(","));

    //   req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    //   let sortBy = {};
    //   if (sort[1]) {
    //     sortBy[sort[0]] = sort[1];
    //   } else {
    //     sortBy[sort[0]] = "asc";
    //   }

    //   const cards = await Card.find({
    //     class: { $regex: search, $options: "i" },
    //   })
    //     .where("extraField")
    //     .in([...extraField])
    //     .sort(sortBy)
    //     .skip(page * limit)
    //     .limit(limit);

    //   const total = await Card.countDocuments({
    //     extraField: { $in: [...extraField] },
    //     class: { $regex: search, $options: "i" },
    //   });
    //   const response = {
    //     error: false,
    //     total,
    //     page: page + 1,
    //     limit,
    //     extraField: extraFieldOptions,
    //     cards,
    //   };
    //   res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//get card by id
exports.getCard = async (req, res) => {
  try {
    console.log(req.params.cardId, "ID______________");
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({ msg: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Get all seller products
exports.getSellerCards = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const result = await User.aggregate([
      {
        $match: {
          _id: ObjectId(sellerId),
        },
      },
      {
        $lookup: {
          from: "cards", //must be collection name for cards
          localField: "_id",
          foreignField: "createdBy",
          as: "Cards",
        },
      },
    ]);
    if (result.length > 0) {
      res.send(result[0].Cards);
    } else {
      res.status(404).send("Seller not found");
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send(error);
  }
};

//Update Card
exports.updateCard = async (req, res) => {
  const {
    cardNumber,
    expiryDate,
    cvv,
    socialSecurityNumber,
    drivingLicenceNumber,
    // Class,
    level,
    price,
    bankName,
    type,
    otherDetails,
  } = req.body;
  let updateFields = {};
  if (cardNumber) updateFields.cardNumber = cardNumber;
  if (expiryDate) updateFields.expiryDate = expiryDate;
  if (cvv) updateFields.cvv = cvv;
  if (socialSecurityNumber)
    updateFields.socialSecurityNumber = socialSecurityNumber;
  if (drivingLicenceNumber)
    updateFields.drivingLicenceNumber = drivingLicenceNumber;
  if (level) updateFields.level = level;
  if (price) updateFields.price = price;
  if (bankName) updateFields.bankName = bankName;
  if (type) updateFields.type = type;
  if (otherDetails) updateFields.otherDetails = otherDetails;

  try {
    let product = await Card.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    product = await Card.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

//Delete Card
exports.deleteCard = async (req, res) => {
  try {
    const product = await Card.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "Card not found" });

    await Card.findByIdAndRemove(req.params.id);

    res.json({ msg: "Card removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

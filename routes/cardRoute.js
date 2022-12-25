const express = require("express");
const router = express.Router();
const {
  createCard,
  getAllCards,
  getCard,
  getSellerCards,
  updateCard,
  deleteCard
} = require("../controllers/cardController");
const Auth = require("../middleware/auth");
const IsSeller = require("../middleware/IsSeller");
const cardValidation = require("../middleware/Validator/card.validator");

router.post("/", Auth, IsSeller, createCard);
router.get("/seller_prod", Auth, IsSeller, getSellerCards);
router.get("/", getAllCards);
router.get("/:cardId", getCard);
router.put('/update/:id',Auth, IsSeller,updateCard)
router.delete('/delete/:id',Auth, IsSeller,deleteCard)

module.exports = router;

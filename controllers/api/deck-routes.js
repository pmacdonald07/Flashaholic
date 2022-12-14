const router = require("express").Router();
const { Card, Deck, Favorite, User } = require("../../models");
const withAuth = require("../../middleware/isAuthenticated");
var validator = require('validator');

//POST decks to favorites and myDecks page when save button is clicked
router.post("/:id/favorites", withAuth, async (req, res) => {
  try {
    let favoriteDeck = await Favorite.create({
      deck_id: req.params.id,
      user_id: req.session.currentUser.id,
    });

    res.json(favoriteDeck);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST deck once created
router.post("/", withAuth, async (req, res) => {
  try {
    if (validator.isEmpty(req.body.title)) {
      throw "Deck must have a title"
    }

    let createDeck = await Deck.create({
      title: req.body.title,
      is_public: req.body.is_public,
      user_id: req.session.currentUser.id,
    });

    for (let i = 0; i < req.body.cards.length; i++) {
      req.body.cards[i].deck_id = createDeck.id;
    }

    let cards = await Card.bulkCreate(req.body.cards);

    createDeck.cards = cards;

    res.json(createDeck);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE created deck
router.delete("/:id", withAuth, async (req, res) => {
  try {
    let deleteCreatedDeck = await Deck.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCreatedDeck) {
      res.status(404).json({ message: "ID not found" });
      return;
    }
    res.json(deleteCreatedDeck);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET flashcard deck info
router.get("/cards/:id", withAuth, async (req, res) => {
  try {
    let dbFlashcard = await Deck.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title"],
      include: [
        {
          model: Card,
          attributes: ["id", "user_id", "deck_id", "front_text", "back_text"],
        },
      ],
    });
    res.json(dbFlashcard);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE favorite deck
router.delete("/:id/favorites", withAuth, async (req, res) => {
  try {
    let deleteFavoriteDeck = await Favorite.destroy({
      where: {
        deck_id: req.params.id,
        user_id: req.session.currentUser.id
      },
    });
    if (!deleteFavoriteDeck) {
      res.status(404).json({ message: "ID not found" }); return;
    }
    res.json(deleteFavoriteDeck);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

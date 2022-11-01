const User = require("./User");
const Deck = require("./Deck");
const Card = require("./Card");

// create associations

User.hasMany(Deck, {
  foreignKey: "user_id",
});

Deck.belongsTo(User, {
  foreignKey: "user_id",
});

Card.belongsTo(User, {
  foreignKey: "user_id",
});

Card.belongsTo(Deck, {
  foreignKey: "deck_id",
});

User.hasMany(Card, {
  foreignKey: "user_id",
});

Deck.hasMany(Card, {
  foreignKey: "deck_id",
});

module.exports = { User, Deck, Card };

const sequelize = require('../Config/db');
const User = require('./user');
const Auction = require('./auction');
const Bid = require('./bid');

User.hasMany(Bid);
Auction.hasMany(Bid);

sequelize.sync();

module.exports = {
  User,
  Auction,
  Bid,
};

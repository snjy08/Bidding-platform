const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');
const User = require('./user');
const Auction = require('./auction');

const Bid = sequelize.define('Bid', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Bid.belongsTo(User);
Bid.belongsTo(Auction);

module.exports = Bid;

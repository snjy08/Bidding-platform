const { Auction, Bid } = require('../models');
const { Op } = require('sequelize');

exports.placeBid = async (req, res) => {
  const { amount } = req.body;
  const { auctionId } = req.params;

  try {
    const auction = await Auction.findByPk(auctionId);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    if (auction.status !== 'open') {
      return res.status(400).json({ message: 'Auction is closed' });
    }

    if (amount <= auction.currentPrice) {
      return res.status(400).json({ message: 'Bid amount must be higher than the current price' });
    }

    const bid = await Bid.create({ amount, UserId: req.user.id, AuctionId: auction.id });

    auction.currentPrice = amount;
    await auction.save();

    // Emit the bid event to all connected clients
    req.io.emit('bidPlaced', { auctionId, bid });

    res.status(201).json({ message: 'Bid placed successfully', bid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const { Auction, Bid } = require('../models');

exports.createAuction = async (req, res) => {
  const { title, description, startingPrice } = req.body;

  try {
    const auction = await Auction.create({ title, description, startingPrice, currentPrice: startingPrice });
    res.status(201).json({ message: 'Auction created successfully', auction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.findAll();
    res.json({ auctions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAuction = async (req, res) => {
  try {
    const auction = await Auction.findByPk(req.params.id, {
      include: [Bid],
    });

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    res.json({ auction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.closeAuction = async (req, res) => {
  try {
    const auction = await Auction.findByPk(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    auction.status = 'closed';
    await auction.save();

    res.json({ message: 'Auction closed successfully', auction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

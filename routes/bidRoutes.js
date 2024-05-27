const express = require('express');
const { placeBid } = require('../controllers/bidController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:auctionId', authenticate, placeBid);

module.exports = router;

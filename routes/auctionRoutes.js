const express = require('express');
const { createAuction, getAuctions, getAuction, closeAuction } = require('../controllers/auctionController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, authorize('admin'), createAuction);
router.get('/', getAuctions);
router.get('/:id', getAuction);
router.patch('/:id/close', authenticate, authorize('admin'), closeAuction);

module.exports = router;

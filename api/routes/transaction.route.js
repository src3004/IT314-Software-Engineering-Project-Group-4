import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createTransaction, getTransaction, getTransactions } from '../controllers/transaction.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createTransaction);
router.get('/get/:userId/:listingId', verifyToken, getTransaction);
router.get('/get/:id', verifyToken, getTransactions);

export default router;
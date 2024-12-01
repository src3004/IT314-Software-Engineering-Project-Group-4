import Transaction from "../models/transaction.model.js";
import { errorHandler } from "../utils/error.js";

export const createTransaction = async (req, res, next) => {
    try {
        await Transaction.create(req.body);
        res.status(201).json('Transaction Completed Successfully');
    } catch (error) {
        next(error);
    }
};

export const getTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findOne({userId: req.params.userId, listingId: req.params.listingId});
        if (!transaction) res.status(204).json('No Transaction Found!');
        else res.status(200).json(transaction);
    } catch (error) {
        next (error);
    }
};

export const getTransactions = async (req, res, next) => {
    if (req.user.id === req.params.id)
    {
        try {
            const sent = await Transaction.find({userId: req.params.id});
            const received = await Transaction.find({sellerId: req.params.id});

            const sentWithType = sent.map(transaction => ({ ...transaction._doc, type: 'sent' }));
            const receivedWithType = received.map(transaction => ({ ...transaction._doc, type: 'received' }));

            const transactions = [...sentWithType, ...receivedWithType].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }
    else
    {
        return next(errorHandler(401, 'You can only view your own transactions!'));
    }
};
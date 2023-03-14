import mongoose from "mongoose";
import { Schema } from "mongoose";

const walletScheme = Schema({
    balance: {
        type: Number,
        required: false,
        default: 0
    },
    addres: {
        type: String,
        required: true,
        index: true
    },
    coin: String,
    chainId: Number,
    transactions: ({ type: Schema.Types.ObjectId, ref: 'Transaction' })
})

module.exports = mongoose.model('Wallet', walletScheme)
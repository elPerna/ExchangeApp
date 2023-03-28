const mongoose = require('mongoose')

const transactionScheme = mongoose.Schema({
    nature: {
        type: Number,
        required: true,
        index: true
    },
    txHash: {
        type: String,
        index: true,
    },
    amount: Number,
    create_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    to: String,
    confirmations: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        required: false,
        default: 1,
        index: true
    }
})

module.exports = mongoose.model('Transaction', transactionScheme)
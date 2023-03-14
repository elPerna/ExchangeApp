import mongoose from "mongoose";
import { Schema } from "mongoose";

const walletContractScheme = Schema({
    address: {
        type: String,
        unique: true,
        required: true
    },
    reserved: {
        type: Boolean,
        default: false
    },
    chainId: Number
})

module.exports = mongoose.model('WalletContract', walletContractScheme)
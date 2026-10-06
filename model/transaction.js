import mongoose from "mongoose"
const TransactionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    date: {
        type: String,
        trim: true
    },
    time: {
        type: String,
        trim: true
    },
    invoiceID: {
        type: String,
        unique: true
    },
    amount: {
        type: Number,
        trim: true
    },
    status: {
        type: String,
        trim: true
    },
    action: {
        type: String
    }
})

const Transaction = mongoose.model("transactions", TransactionSchema)

export default Transaction
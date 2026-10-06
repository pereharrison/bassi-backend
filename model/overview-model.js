import mongoose from "mongoose"
const OverviewSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    startDate: {
        type: String,
        trim: true,
        required: true
    },
    endDate: {
        type: String,
        trim : true
    },
    priority: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true})

const Overview = mongoose.model("overiew", OverviewSchema)

export default Overview


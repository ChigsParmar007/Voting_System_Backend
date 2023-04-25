const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    electionFor: {
        type: String,
        required: true,
        unique: true
    },
    descrption: {
        type: String,
        required: true
    },
    electionDate: {
        type: Date,
        default: Date.now
    },
},
    { timestamps: true }
)

const electionSchema = mongoose.model('election', schema)

module.exports = electionSchema
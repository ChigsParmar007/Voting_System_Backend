const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    electionId: {
        type: mongoose.Types.ObjectId,
        ref: 'election',
        required: true,
        unique: true
    },
    candidates: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                required: true,
                unique: true
            },
            votes: {
                type: Number,
                default: 0
            }
        }
    ],
    totalVotes: {
        type: Number,
        default: 0
    },
},
    { timestamps: true }
)

const resuletSchema = mongoose.model('result', schema)

module.exports = resuletSchema
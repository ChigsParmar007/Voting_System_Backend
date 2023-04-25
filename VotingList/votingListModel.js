const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        require: true
    },
    electionId: {
        type: mongoose.Types.ObjectId,
        ref: 'election',
        require: true
    }
})

const votingListSchema = mongoose.model('votinglist', schema)

module.exports = votingListSchema
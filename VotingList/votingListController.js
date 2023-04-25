const catchAsync = require("../Utils/catchAsync")
const Votinglist = require('./votingListModel')

const addData = catchAsync(async (userId, electionId) => {
    await Votinglist.create({ userId, electionId })
})

const checkIfExists = async (userId, electionId) => {
    const data = await Votinglist.findOne({ userId, electionId })

    console.log(data)

    if (data === null || data === undefined || data === [] || data === {}) return false

    return true
}

module.exports = {
    addData,
    checkIfExists
}
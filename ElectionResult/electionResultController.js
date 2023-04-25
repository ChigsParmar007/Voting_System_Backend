const catchAsync = require('../Utils/catchAsync')
const AppError = require('../Utils/AppError')
const { checkIfExists, addData } = require('../VotingList/votingListController')
const Result = require('./electionResultModel')

const addResult = catchAsync(async (electionId, candidates) => {
    console.log(candidates)
    const data = await Result.create({
        electionId,
        candidates
    })

    return data
})

const addVote = catchAsync(async (req, res, next) => {
    const ifExists = await checkIfExists(req.user._id, req.params.electionId)
    console.log(ifExists)

    if (ifExists === false) {
        return next(new AppError('You already gave vote', 400))
    }

    const result = await Result.findOne({ electionId: req.params.electionId })

    result.candidates = result.candidates.map(candidate => {
        if (candidate.userId.toString() === req.body.userId) {
            candidate.votes = candidate.votes + 1
        }
        return candidate
    })

    result.totalVotes = result.totalVotes + 1

    await result.save()

    await addData(req.user._id, req.params.electionId)

    return res.status(200).json(result)
})

const getAll = catchAsync(async (req, res, next) => {
    const data = await Result.find()
        .populate({ path: 'electionId' })

    const totalVotes = data.totalVotes

    return res.status(200).json(data)
})

const getOne = catchAsync(async (req, res, next) => {
    const data = await Result.findOne({ electionId: req.params.electionId })
        .populate({ path: 'electionId' })
        .populate({
            path: 'candidates',
            populate: {
                path: 'userId',
                model: 'user'
            }
        })

    return res.status(200).json(data)
})

module.exports = {
    addResult,
    addVote,
    getAll,
    getOne
}
const Election = require('./electionModel')
const catchAsync = require('../Utils/catchAsync')
const { addResult } = require('../ElectionResult/electionResultController')

const addelection = catchAsync(async (req, res, next) => {
    const data = await Election.create({
        electionFor: req.body.electionFor,
        descrption: req.body.descrption,
        electionDate: req.body.electionDate
    })

    const candidates = req.body.candidates

    console.log(candidates)

    const data1 = await addResult(data._id, candidates)

    return res.status(201).json({ data, data1 })
})

const getElection = catchAsync(async (req, res, next) => {
    const data = await Election.find(req.params.id)

    return res.status(200).json(data)
})

module.exports = {
    addelection
}
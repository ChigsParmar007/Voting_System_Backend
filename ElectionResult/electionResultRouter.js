const express = require('express')
const router = express.Router()
const { addVote, getAll, getOne } = require('./electionResultController')
const { selectUserModel } = require('../Common/Middlewares/selectModels')
const { selectUserSecretKey } = require('../Common/Middlewares/selectSecretKey')
const { protect } = require('../Login/authMiddleware')

router
    .route('/addvote/:electionId')
    .patch(selectUserModel, selectUserSecretKey, protect, addVote)

router
    .route('/getall')
    .get(getAll)

router
    .route('/getone/:electionId')
    .get(getOne)

module.exports = router
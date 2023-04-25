const express = require('express')
const router = express.Router()
const { addelection } = require('./electionController')
const { selectAdminModel, selectUserModel } = require('../Common/Middlewares/selectModels')
const { selectAdminSecretKey, selectUserSecretKey } = require('../Common/Middlewares/selectSecretKey')
const { protect } = require('../Login/authMiddleware')

router
    .route('/addelection')
    .post(selectAdminModel, selectAdminSecretKey, protect, addelection)

module.exports = router
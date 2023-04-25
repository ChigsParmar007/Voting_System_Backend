const express = require('express')
const router = express.Router()
const { signup } = require('./adminController')
const { signupMiddleware } = require('./adminMiddleware')
const { signinMiddleware, signin, signout } = require('../Login/login')
const { selectAdminSecretKey } = require('../Common/Middlewares/selectSecretKey')
const { selectAdminModel } = require('../Common/Middlewares/selectModels')
const { protect } = require('../Login/authMiddleware')

router.use(selectAdminModel)
router.use(selectAdminSecretKey)

router
    .route('/signup')
    .post(signupMiddleware, signup)

router
    .route('/signin')
    .post(signinMiddleware, signin)

router
    .route('/signout')
    .get(protect, signout)

module.exports = router
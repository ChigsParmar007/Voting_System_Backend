const express = require('express')
const router = express.Router()
const { signup } = require('./userController')
const { signupMiddleware } = require('./userMiddleware')
const { signinMiddleware, signin, signout } = require('../Login/login')
const { selectUserSecretKey } = require('../Common/Middlewares/selectSecretKey')
const { selectUserModel } = require('../Common/Middlewares/selectModels')
const { protect } = require('../Login/authMiddleware')

router.use(selectUserModel)
router.use(selectUserSecretKey)

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
const AppError = require('../Utils/AppError')
const catchAsync = require('../Utils/catchAsync')
const jwt = require('jsonwebtoken')
const {
    emailvalidate,
    passwordLengthvalidate,
    passwordAndpasswordConfirmValidate
} = require('../Common/Functions/validateInputs')

const tokenGenerate = (id, secretKey) => {
    return jwt.sign({ id }, secretKey, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const signinMiddleware = (req, res, next) => {
    const missingValues = []

    if (!req.body.email) missingValues.push('Email')
    if (!req.body.password) missingValues.push('Password')

    if (missingValues.length > 0) return next(new AppError(`requird missing values : ${missingValues.join(', ')}`, 400))

    if (!emailvalidate(req.body.email)) {
        return next(new AppError('Invalid email address.', 400))
    }

    if (!passwordLengthvalidate(req.body.password)) {
        return next(new AppError('Password should be at least 8 to 20 characters.', 400))
    }

    next()
}

const signin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    const user = await req.model.findOne({ email }).select('+password')
    if (user === null || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            message: 'Email and Password incorrect. Check your Login credentials.'
        })
    }
    user.password = undefined

    const token = tokenGenerate(user._id, req.secretKey)

    res.status(200).json({
        message: 'Login Successfully',
        token,
        user
    })
})

const signout = (req, res, next) => {
    const token = jwt.sign({ id: req.user._id }, req.secretKey, {
        expiresIn: '1s'
    })

    res.status(200).json({
        message: 'Logout Successfully',
        token
    })
}

const updatePasswordMiddleware = (req, res, next) => {

    const missingValues = []

    if (!req.body.passwordCurrent) missingValues.push('Current Password')
    if (!req.body.password) missingValues.push('Password')
    if (!req.body.passwordConfirm) missingValues.push('Password Confirm')

    if (missingValues.length > 0) return next(new AppError(`requird missing values : ${missingValues.join(', ')}`, 400))

    if (!passwordLengthvalidate(req.body.password)) {
        return next(new AppError('Password should be at least 8 to 20 characters.', 400))
    }

    if (!passwordAndpasswordConfirmValidate(req.body.password, req.body.passwordConfirm)) {
        return next(new AppError('Password and Password Confirm are not match.', 400))
    }

    next()
}

const updatePassword = catchAsync(async (req, res) => {
    const { passwordCurrent, password } = req.body

    if (!(await req.user.correctPassword(passwordCurrent, req.user.password))) {
        return res.status(401).json({
            message: 'Current password is incorrect'
        })
    }

    req.user.password = password
    const user = await req.user.save()
    user.password = undefined

    const token = tokenGenerate(req.user._id, req.secretKey)

    res.status(200).json({
        message: 'Password Change SuccessFully',
        token,
        user
    })
})

module.exports = {
    tokenGenerate,
    signinMiddleware,
    signin,
    signout,
    updatePasswordMiddleware,
    updatePassword
}
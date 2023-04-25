const AppError = require('../Utils/AppError')

const signupMiddleware = (req, res, next) => {

    const missingValues = []
    if (!req.body.firstName) missingValues.push('Enter First Name')
    if (!req.body.lastName) missingValues.push('Enter Last Name')
    if (!req.body.dob) missingValues.push('Enter Date Of Birth.')
    if (!req.body.age) missingValues.push('Enter Age.')
    if (!req.body.email) missingValues.push('Enter Email.')
    if (!req.body.phone) missingValues.push('Enter Phone Number.')
    if (!req.body.gender) missingValues.push('Enter Gender.')
    if (!req.body.category) missingValues.push('Enter Category.')
    if (!req.body.address) missingValues.push('Enter Address.')
    if (!req.body.state) missingValues.push('Enter State.')
    if (!req.body.city) missingValues.push('Enter City.')
    if (!req.body.pinCode) missingValues.push('Enter Pincode Number.')
    if (!req.body.aadharCard) missingValues.push('Enter Adhar Card Number.')
    if (!req.body.voterIdCard) missingValues.push('Enter Voter ID Card number.')
    if (!req.body.password) missingValues.push('Enter Password.')
    if (!req.body.passwordConfirm) missingValues.push('Password Confirm')

    if (missingValues.length > 0) return next(new AppError(`Requird missing values : ${missingValues.join(', ')}`, 400))

    next()
}

module.exports = {
    signupMiddleware
}
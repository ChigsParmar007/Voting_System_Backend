const catchAsync = require('../Utils/catchAsync')

const signup = catchAsync(async (req, res, next) => {
    const user = await req.model.create(req.body)
    user.password = undefined

    return res.status(200).json({
        message: 'User Register Successfully',
        user
    })
})

module.exports = {
    signup,
}
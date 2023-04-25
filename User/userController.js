const catchAsync = require('../Utils/catchAsync')

const signup = catchAsync(async (req, res, next) => {
    const user = await req.model.create(req.body)

    res.status(201).json({
        message: 'User added successfully',
    })
})

module.exports = {
    signup
}
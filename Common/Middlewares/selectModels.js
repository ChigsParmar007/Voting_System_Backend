const userModel = require('../../User/userModel')
const AdminModel = require('../../Admin/adminModel')

const selectUserModel = (req, res, next) => {
    req.model = userModel

    next()
}

const selectAdminModel = (req, res, next) => {
    req.model = AdminModel

    next()
}

module.exports = {
    selectUserModel,
    selectAdminModel
}
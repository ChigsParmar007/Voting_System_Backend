const selectUserSecretKey = (req, res, next) => {
    req.secretKey = process.env.JWT_SECRET_USER

    next()
}

const selectAdminSecretKey = (req, res, next) => {
    req.secretKey = process.env.JWT_SECRET_ADMIN

    next()
}

module.exports = {
    selectUserSecretKey,
    selectAdminSecretKey
}
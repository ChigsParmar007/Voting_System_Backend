const emailvalidate = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!emailRegex.test(email)) return false

    return true
}

const passwordSpaceValidate = (password) => {
    const passwordArray = password.split('')
    let temp = true
    passwordArray.map(data => {
        if (data === '') temp = false
    })
    if (!temp) return false
    return true
}

const passwordLengthvalidate = (password) => {
    if (password.length < 8 || password.length > 20) return false

    return true
}

const passwordAndpasswordConfirmValidate = (password, confirmPassword) => {
    if (password !== confirmPassword) return false

    return true
}

const passwordValidate = (password) => {
    const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    if (!passwordRegex.test(password)) {
        return fasle
    }

    return true
}

const pincodeValidate = (pincode) => {
    if (pincode.toString().length !== 6) return false

    return true
}

const phonenumberValidate = (phoneNo) => {
    if (phoneNo.toString().trim().length !== 10) return false

    return true
}

module.exports = {
    emailvalidate,
    passwordLengthvalidate,
    passwordAndpasswordConfirmValidate,
    pincodeValidate,
    phonenumberValidate,
    passwordValidate,
    passwordSpaceValidate
}
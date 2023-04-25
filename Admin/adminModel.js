const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const schema = new mongoose.Schema({
    phoneNo: {
        type: String,
        required: [true, 'Primary Phone number is required'],
        unique: true,
        min: 10,
        max: 10
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
        trim: true,
        min: 8,
        max: 20
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
},
    { timestamps: true }
)


schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcryptjs.hash(this.password, 12)

    next()
})

schema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcryptjs.compare(candidatePassword, userPassword);
}

schema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        )
        return JWTTimestamp < changedTimestamp
    }

    return false
}

const adminSchema = mongoose.model('admin', schema)

module.exports = adminSchema
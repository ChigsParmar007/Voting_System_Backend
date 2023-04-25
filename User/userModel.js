const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    age: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['General', 'OBC', 'SEBC', 'Other', 'ST', 'SC'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    aadharCard: {
        type: String,
        required: true,
        unique: true,
    },
    voterIdCard: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
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

const userSchema = mongoose.model('user', schema)

module.exports = userSchema
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avtar: {
            type: String,  // cloudinary url
            required: true,
        },
        coverImage: {
            type: String  // cloudinary url
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
        },
        refreshToken: {
            type: String
        },

    },
    {
        timestamps: true
    }

)

userSchema.pre('save', async function (next) {

    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 12)
    next()


})

userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password)

}

userSchema.methods.generateAcessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
            fullName: this.fullName,
            email: this.email

        },
        process.env.acess_token_Secret,
        {
            expiresIn: process.env.acess_token_Expiry
        }
    )
}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.refresh_token_secret,
        {
            expiresIn: process.env.refresh_token_expiry
        }
    )
}

const User = new mongoose.model("User", userSchema)

module.exports = User
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
// import crypto, { createHash } from "crypto"
import config from "../config/index.js";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        unique: true,
        maxlength: [30, "Name shouldn't exceed 30 characters"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] // Email validation regex
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, 'Password must be a minimum of 6 characters'],
        select: false // Ensure password is not returned by default
    },
    role: {
        type: String,
        enum: ['admin'],
        required: true,
        default: 'admim'
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next;
    this.password = await bcrypt.hash(this.password, 10); 
    next();
})




userSchema.methods = {
    comparePassword: async function (currentPassword) {
        return await bcrypt.compare(currentPassword, this.password);
    },
    getJWTtoken: function () {
        return JWT.sign({ _id: this._id, role: this.role }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRY
        })
    }
}
export default mongoose.model('User', userSchema)



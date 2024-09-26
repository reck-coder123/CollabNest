import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide your name"],
        
    },

    email: {
        type: String,
        required:[true, "Please provide a email"],
        unique:true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    Presence: {
        type: Number,
        default : 0
    },
    Concepts: {
        type: Number,
        default: 0
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,



})

const User=mongoose.models.users || mongoose.model("users", userSchema);

export default User

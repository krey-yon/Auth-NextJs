import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    forgotPasswordToken: { type: String },
    forgotPasswordExpires: { type: Date },
    verifyToken: { type: String },
    verifyTokenExpires: { type: Date },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
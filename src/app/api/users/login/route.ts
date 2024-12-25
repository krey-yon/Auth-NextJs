import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        //check if password is correct
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        //create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        };
        //create token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;
    } catch (error: any) {
        console.log("Login failed", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
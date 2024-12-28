import { dbConnect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

dbConnect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token, password } = reqBody;

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json({ error: "Token is invalid or has expired" }, { status: 400 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function GET(req: NextRequest) {
    try {
        // Extract email from query parameters
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: "Email parameter is missing" }, { status: 400 });
        }

        const savedUser = await User.findOne({ email });

        if (!savedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Call sendEmail function
        await sendEmail({ email, emailType: "RESET", userId: savedUser._id });

        return NextResponse.json({ message: "Verification email sent successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
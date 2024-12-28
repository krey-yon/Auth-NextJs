import { dbConnect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

dbConnect();

export async function POST(req: NextRequest) {
    try {
     const reqBody = await req.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({ verifyToken: token, verifyTokenExpires: { $gt: Date.now() } });

    if (!user) {
        return NextResponse.json({ error: "Token is invalid or has expired" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

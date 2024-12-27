import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConfig";

dbConnect();

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        if(!user){
            throw new Error("User not found");
        }
        return NextResponse.json({
            data: user,
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
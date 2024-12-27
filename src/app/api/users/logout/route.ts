import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Clear the cookie
    const response = NextResponse.json({ message: "Logged out", success: true });
    response.cookies.set("token", "", { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

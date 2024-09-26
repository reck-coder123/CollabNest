import { connect } from "@dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@models/UserModel";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();

        // Extract the token from reqBody and decode it
        const { token } = reqBody;
        console.log(token);
        const decodedToken = (token);

        // Find the user using the decoded token and check if the token is still valid
        const user = await User.findOne({
            verifyToken: decodedToken,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // console.log(user);

        // Mark the user as verified and remove token-related fields
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

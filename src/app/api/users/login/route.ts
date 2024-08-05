import { Connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Checking if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User not found. Please check your email and try again." },
                { status: 400 }
            );
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid password. Please enter the correct password." },
                { status: 400 }
            );
        }

        // Creating token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // Creating token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, {
            expiresIn: "1h",
        });

        // Sending token to user cookies
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message || "An error occurred during login. Please try again later.",
            },
            { status: 500 }
        );
    }
}

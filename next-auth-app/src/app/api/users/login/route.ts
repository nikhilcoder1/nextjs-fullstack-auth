import { connectToDatabse } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/lib/validators/auth.schema";
import { ZodError } from "zod";
import { rateLimit } from "@/lib/rate-limit";


connectToDatabse();

export async function POST(request: NextRequest){
    
    try {
        const ip =
            request.headers.get("x-forwarded-for") ??
            request.headers.get("x-real-ip") ??
            "unknown";

            if (!rateLimit(ip)) {
                return NextResponse.json(
                    { error: "Too many login attempts. Please try again later." },
                    { status: 429 }
                );
            }

        const reqBody = await request.json();
        const { email, password } = loginSchema.parse(reqBody);

        // find user + include hidden fields
        const user = await User.findOne({ email }).select("+password +isVerified");

        if (!user) {
        return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json(
                {error: "Invalid password"}, 
                {status: 400}
            );
        }

        // BLOCK if email not verified
        if (!user.isVerified) {
            return NextResponse.json(
                { error: "Please verify your email before logging in" },
                { status: 400 }
            );
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token
        const token = jwt.sign(
            tokenData, 
            process.env.TOKEN_SECRET!, 
            { expiresIn: "1d" }
        )

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return response;

    } catch (error: any) {
        if (error instanceof ZodError) {
            return NextResponse.json(
            { error: error.issues[0].message },
            { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
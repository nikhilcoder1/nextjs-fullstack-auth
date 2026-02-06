import { connectToDatabse } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDatabse();

export async function POST(request: NextRequest){
    
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

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
        return NextResponse.json(
            {error: error.message}, 
            {status: 500}
        )
    }
}
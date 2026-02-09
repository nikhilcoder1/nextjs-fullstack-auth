import { connectToDatabse } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { forgotPasswordSchema } from "@/lib/validators/auth.schema";
import { ZodError } from "zod";
import { rateLimit } from "@/lib/rate-limit";

connectToDatabse();

export async function POST(request:NextRequest){
    try{
        const ip =
            request.headers.get("x-forwarded-for") ??
            request.headers.get("x-real-ip") ??
            "unknown";

            if (!rateLimit(ip)) {
                return NextResponse.json(
                    { error: "Too many requests. Please try again later." },
                    { status: 429 }
                );
            }

        const reqBody = await request.json();
        const { email } = forgotPasswordSchema.parse(reqBody);

        const user = await User.findOne({email});
        
        if (!user) {
            return NextResponse.json(
                { 
                    success: true ,
                    message: "If an account exists, a reset link has been sent",
                }
            );
        }

        const token = await bcrypt.hash(user._id.toString(),10);

        user.forgotPasswordToken = token;
        user.forgotPasswordTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        var transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.MAILTRAP_USER!,
                    pass: process.env.MAILTRAP_PASS!,
            }
        });

        const resetUrl = `${process.env.DOMAIN}/resetpassword?token=${token}`;

        await transporter.sendMail({
            to: user.email,
            subject: "Reset Password",
            html: `<a href="${resetUrl}">Reset Password</a>`,
        });

        return NextResponse.json({ success: true });
    } catch(error:any){
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
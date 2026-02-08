import { connectToDatabse } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

connectToDatabse();

export async function POST(request:NextRequest){
    const {email} = await request.json();

    const user = await User.findOne({email});
    
    if(!user){
        return NextResponse.json(
            {error : "USer does not found with this email"},
            {status:400}
        )
    }

    const token = await bcrypt.hash(user._id.toString(),10);

    user.forgotPasswordToken = token;
    user.forgotPasswordTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "306cefc9e0ee82",
                pass: "7572e37ef13fc6"
        }
    });

    const resetUrl = `${process.env.DOMAIN}/resetpassword?token=${token}`;

    await transporter.sendMail({
        to: user.email,
        subject: "Reset Password",
        html: `<a href="${resetUrl}">Reset Password</a>`,
    });

    return NextResponse.json({ success: true });
}
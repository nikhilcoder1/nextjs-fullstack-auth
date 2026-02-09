import { connectToDatabse } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { resetPasswordSchema } from "@/lib/validators/auth.schema";
import { ZodError } from "zod";

connectToDatabse();

export async function POST(request: NextRequest) {

  try {
    const body = await request.json();
    const { token, password } = resetPasswordSchema.parse(body);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token" }, 
        { status: 400 }
      );
    }

    user.password = await bcrypt.hash(password, 10);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { 
        success: true ,
        message: "Password reset successful",
      }
    );
  }catch (error: any) {
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

import { connectToDatabse } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

connectToDatabse();

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  const user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  user.password = await bcrypt.hash(password, 10);
  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;

  await user.save();

  return NextResponse.json({ success: true });
}

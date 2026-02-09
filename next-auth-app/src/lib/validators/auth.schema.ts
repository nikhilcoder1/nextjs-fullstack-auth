import { z } from "zod";

/* ---------- Common ---------- */
export const emailSchema = z.string().email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password too long");

/* ---------- Auth ---------- */
export const signupSchema = z.object({
  username: z.string().min(3),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(10, "Invalid token"),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: z.string().min(10),
  password: passwordSchema,
});
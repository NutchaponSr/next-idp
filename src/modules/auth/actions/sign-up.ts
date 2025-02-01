"use server";

import bcrypt from "bcryptjs";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

import { SignUpSchema, SignUpSchemaType } from "@/modules/auth/schemas/sign-up";

export const SignUp = async (value: SignUpSchemaType) => {
  const validatedFields = SignUpSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid Input" };
  }

  const {
    email,
    name,
    password,
  } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    });

  return { success: "Confirmation email sent!" }
}
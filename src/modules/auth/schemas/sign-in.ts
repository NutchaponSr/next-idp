import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(1, "Required").max(20, "Password must be at most 20 characters").trim(),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
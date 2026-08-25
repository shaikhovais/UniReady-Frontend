import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email("Please enter a valid email address."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Must contain an uppercase letter.")
      .regex(/[0-9]/, "Must contain a number."),

    confirmPassword: z.string(),
  })
  .refine((x) => x.password === x.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
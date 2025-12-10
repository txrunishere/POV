import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(2, { error: "Too short" }),
  username: z.string().min(2, { error: "Too short" }),
  email: z.string().email({ error: "Invalid Email" }),
  password: z
    .string()
    .min(8, {
      error: "Password must be at least 8 letters long",
    })
    .max(50, {
      error: "Password must be at most 50 letters long",
    }),
});
type ISignUpSchema = z.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = z.object({
  email: z.string().email({ error: "Invalid Email" }),
  password: z
    .string()
    .min(8, {
      error: "Password must be at least 8 letters long",
    })
    .max(50, {
      error: "Password must be at most 50 letters long",
    }),
});
type ISignInSchema = z.infer<typeof SignInFormSchema>;

export type { ISignUpSchema, ISignInSchema };

import * as yup from "yup";
import type { InferType } from "yup";

export const signInSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type SignInType = InferType<typeof signInSchema>;

export const defaultValues: SignInType = {
  email: "",
  password: "",
};

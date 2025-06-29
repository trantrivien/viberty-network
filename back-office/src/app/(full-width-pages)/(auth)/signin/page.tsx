import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viberty Network SignIn Page | Viberty Network Dashboard Template",
  description: "This is Viberty Network Signin Page",
};

export default function SignIn() {
  return <SignInForm />;
}

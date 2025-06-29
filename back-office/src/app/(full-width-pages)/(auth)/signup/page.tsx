import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viberty Network SignUp Page | Viberty Network Dashboard",
  description: "This is Viberty Network SignUp Page",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}

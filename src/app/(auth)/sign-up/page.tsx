import { SignUpForm } from "@/modules/auth/components/sign-up-form";
import { AuthWrapper } from "@/modules/auth/components/auth-wrapper";

const SignUpPage = () => {
  return (
    <AuthWrapper title="Sign Up" description="Create your Notion account">
      <SignUpForm />
    </AuthWrapper>
  );
}

export default SignUpPage;
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignIn signUpUrl="/sign-up" forceRedirectUrl="/dashboard/moniters" />
    </div>
  );
};

export default SignInPage;

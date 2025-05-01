import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignUp signInUrl="/sign-in" fallbackRedirectUrl="/dashboard/moniters" />
    </div>
  );
};

export default SignUpPage;

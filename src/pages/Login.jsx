import { SignIn } from '@clerk/clerk-react';
import Section from '../components/Section';

const Login = () => {
  return (
    <Section className="pt-[12rem] -mt-[5.25rem]" id="login">
      <div className="container">
        <div className="max-w-md mx-auto">
          <div className="bg-n-7 p-8 rounded-2xl border border-n-6">
            <h2 className="h2 mb-6 text-center text-n-1">Welcome Back</h2>
            <p className="text-center text-n-4 mb-8">Sign in to your AutoNation account</p>
            
            <div className="flex justify-center">
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-transparent shadow-none border-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "bg-n-8 border border-n-6 text-n-1 hover:bg-n-7 transition-colors",
                    socialButtonsBlockButtonText: "text-n-1",
                    formButtonPrimary: "bg-gradient-to-r from-color-1 to-color-2 hover:opacity-90 transition-opacity text-white border-0",
                    formFieldInput: "bg-n-8 border border-n-6 text-n-1 placeholder-n-4 focus:border-color-1",
                    formFieldLabel: "text-n-3",
                    identityPreviewText: "text-n-1",
                    identityPreviewEditButton: "text-color-1",
                    footerActionText: "text-n-4",
                    footerActionLink: "text-color-1 hover:text-color-2",
                    dividerLine: "bg-n-6",
                    dividerText: "hidden",
                    alternativeMethodsBlockButton: "border border-n-6 text-n-1 hover:bg-n-7",
                    otpCodeFieldInput: "bg-n-8 border border-n-6 text-n-1",
                    formResendCodeLink: "text-color-1 hover:text-color-2",
                    formFieldRow: "hidden"
                  }
                }}
                redirectUrl="/dashboard"
                signUpUrl="/signup"
                signInForceRedirectUrl="/dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Login;
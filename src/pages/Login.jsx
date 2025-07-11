import { SignIn } from '@clerk/clerk-react';
import Section from '../components/Section';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <Section className="pt-[12rem] -mt-[5.25rem]" id="login">
      <div className="container">
        <div className="max-w-md mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-n-7 p-8 rounded-2xl border border-n-6 shadow-2xl"
          >
            <div className="text-center mb-8">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="h2 mb-2 text-n-1 bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent"
              >
                Welcome Back
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-n-4"
              >
                Sign in to your AutoNation account
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "mx-auto w-full",
                    card: "bg-transparent shadow-none border-0 w-full",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "bg-n-8 border border-n-6 text-n-1 hover:bg-n-7 transition-colors hover:shadow-glow hover:shadow-color-1/20",
                    socialButtonsBlockButtonText: "text-n-1",
                    formButtonPrimary: "bg-gradient-to-r from-color-1 to-color-2 hover:opacity-90 transition-all text-white border-0 hover:shadow-glow hover:shadow-color-1/30",
                    formFieldInput: "bg-n-8 border border-n-6 text-n-1 placeholder-n-4 focus:border-color-1 focus:ring-1 focus:ring-color-1/50 transition-all",
                    formFieldLabel: "text-n-3",
                    identityPreviewText: "text-n-1",
                    identityPreviewEditButton: "text-color-1 hover:text-color-2",
                    footerActionText: "text-n-4",
                    footerActionLink: "text-color-1 hover:text-color-2 transition-colors",
                    dividerLine: "bg-n-6",
                    dividerText: "hidden",
                    alternativeMethodsBlockButton: "border border-n-6 text-n-1 hover:bg-n-7 hover:shadow-glow hover:shadow-color-1/10",
                    otpCodeFieldInput: "bg-n-8 border border-n-6 text-n-1 focus:border-color-1 focus:ring-1 focus:ring-color-1/50",
                    formResendCodeLink: "text-color-1 hover:text-color-2 transition-colors",
                    formFieldRow: "hidden",
                    formHeaderTitle: "text-n-1 text-center text-xl font-semibold",
                    formHeaderSubtitle: "text-n-4 text-center",
                  },
                  variables: {
                    colorPrimary: '#3B82F6',
                    colorText: '#FFFFFF',
                    colorTextSecondary: '#A1A1AA',
                    colorBackground: '#18181B',
                    colorInputBackground: '#27272A',
                    colorInputText: '#FFFFFF'
                  }
                }}
                redirectUrl="/dashboard"
                signUpUrl="/signup"
                signInForceRedirectUrl="/dashboard"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              {/* <p className="text-n-4 text-sm">
                Need help? <a href="#" className="text-color-1 hover:text-color-2 transition-colors">Contact support</a>
              </p> */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default Login;
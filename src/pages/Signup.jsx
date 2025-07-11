import { SignUp } from '@clerk/clerk-react';
import Section from '../components/Section';
import { motion } from 'framer-motion';

const Signup = () => {
  return (
    <Section
      id="signup"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-x-hidden"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
        >
          {/* Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text"
            >
              Join AutoNation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base text-gray-300 mt-2"
            >
              Create your account and start automating
            </motion.p>
          </div>

          {/* SignUp Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full flex justify-center"
          >
            <div className="w-full flex justify-center">
              <div className="w-full max-w-sm">
                <SignUp
                  appearance={{
                    elements: {
                      rootBox: 'w-full flex',
                      card: 'w-full bg-transparent border-0 shadow-none',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                      socialButtonsBlockButton:
                        'w-full bg-gray-900 border border-gray-700 text-white hover:bg-gray-800 transition-all text-sm rounded-md px-4 py-2 mb-4',
                      socialButtonsBlockButtonText: 'text-white text-sm',
                      formButtonPrimary:
                        'w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white py-2 px-4 rounded-md transition-all',
                      formFieldInput:
                        'w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-3 py-2 text-sm',
                      formFieldLabel: 'text-gray-400 text-sm mb-1',
                      identityPreviewText: 'text-white text-sm',
                      identityPreviewEditButton: 'text-blue-400 hover:text-blue-500',
                      footerActionText: 'text-gray-400 text-sm',
                      footerActionLink:
                        'text-blue-400 hover:text-blue-500 transition-colors text-sm',
                      dividerLine: 'bg-gray-600',
                      dividerText: 'hidden',
                      alternativeMethodsBlockButton:
                        'w-full border border-gray-700 text-white hover:bg-gray-800 transition-colors rounded-md px-4 py-2 text-sm',
                      otpCodeFieldInput:
                        'w-full bg-gray-900 border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm',
                      formResendCodeLink:
                        'text-blue-400 hover:text-blue-500 transition-colors text-sm',
                      formFieldRow: 'mb-4',
                      formHeaderTitle: 'text-white text-center text-lg font-semibold',
                      formHeaderSubtitle: 'text-gray-400 text-center',
                    },
                    variables: {
                      colorPrimary: '#3B82F6',
                      colorText: '#FFFFFF',
                      colorTextSecondary: '#A1A1AA',
                      colorBackground: '#18181B',
                      colorInputBackground: '#27272A',
                      colorInputText: '#FFFFFF',
                    },
                  }}
                  redirectUrl="/dashboard"
                  signInUrl="/login"
                  signUpForceRedirectUrl="/dashboard"
                />
              </div>
            </div>
          </motion.div>

          {/* Footer (optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center px-2 sm:px-0"
          >
            {/* <p className="text-sm text-gray-300 break-words">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-blue-400 hover:text-blue-500 font-medium transition-colors"
              >
                Log in here
              </a>
            </p> */}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Signup;

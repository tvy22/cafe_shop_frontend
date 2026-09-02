import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthCard() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <div className="flex min-h-screen md:h-screen w-full items-center justify-center bg-bg-primary px-4 py-4 sm:px-6 font-sans">
      {/* Main Split Container Card */}
      <div className="mx-auto flex w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-surface p-5 sm:p-6 shadow-xl border border-accent/40 md:p-7">
        <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
          
          {/* Left Column: Authentic RUPP Cafe Form UI */}
          <div className="flex flex-col justify-center p-4 sm:p-6">
            {/* Header Logo & Brand */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-text-primary shadow-sm">
                R
              </div>
              <h1 className="mt-2 text-2xl font-bold text-text-primary">RUPP Cafe</h1>
              <p className="mt-0.5 text-xs font-medium text-secondary">
                Your Daily Ritual Starts Here
              </p>
            </div>

            {/* Login / Create Account Toggle */}
            <div className="mt-4 flex rounded-xl bg-accent/40 p-1">
              <button
                type="button"
                onClick={() => setIsSignIn(true)}
                className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSignIn
                    ? "bg-surface text-text-primary shadow-sm"
                    : "text-text-primary/60 hover:text-text-primary"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsSignIn(false)}
                className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  !isSignIn
                    ? "bg-surface text-text-primary shadow-sm"
                    : "text-text-primary/60 hover:text-text-primary"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form Controls with Framer Motion Layout Animation */}
            <motion.form 
              layout 
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="mt-4 space-y-3" 
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-accent/80 bg-surface px-3.5 py-2 text-xs text-text-primary placeholder-text-primary/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-text-primary">
                    Password
                  </label>
                  <AnimatePresence>
                    {isSignIn && (
                      <motion.a
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href="#forgot"
                        className="text-xs font-medium text-secondary hover:underline"
                      >
                        Forgot?
                      </motion.a>
                    )}
                  </AnimatePresence>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-accent/80 bg-surface px-3.5 py-2 text-xs text-text-primary placeholder-text-primary/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-primary/50 hover:text-text-primary cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input (Rendered only on Create Account) */}
              <AnimatePresence initial={false}>
                {!isSignIn && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <label className="block text-xs font-semibold text-text-primary mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-accent/80 bg-surface px-3.5 py-2 text-xs text-text-primary placeholder-text-primary/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-primary/50 hover:text-text-primary cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Terms Agreement Checkbox (Rendered only on Create Account) */}
              <AnimatePresence initial={false}>
                {!isSignIn && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden pt-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-accent text-primary focus:ring-primary cursor-pointer accent-primary"
                      />
                      <label htmlFor="terms" className="text-text-primary/80 cursor-pointer text-xs">
                        I agree to the{" "}
                        <a href="#terms" className="font-semibold text-text-primary underline">
                          Terms of Service
                        </a>{" "}
                        &{" "}
                        <a href="#privacy" className="font-semibold text-text-primary underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Submit Button */}
              <button
                type="submit"
                className="w-full rounded-full bg-primary py-2.5 text-xs font-semibold text-text-primary shadow-sm transition-colors hover:bg-primary/90 cursor-pointer mt-1"
              >
                {isSignIn ? "Login" : "Create Account"}
              </button>
            </motion.form>

            {/* Divider */}
            <div className="my-3 border-t border-accent/60" />

            {/* Social Login Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-accent bg-surface py-2 text-xs font-medium text-text-primary transition-colors hover:bg-accent/20 cursor-pointer"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-accent bg-surface py-2 text-xs font-medium text-text-primary transition-colors hover:bg-accent/20 cursor-pointer"
              >
                <svg className="h-4 w-4 fill-current text-text-primary" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.63 1.34-.56.65-1.05 1.72-.92 2.74 1.01.08 2.05-.48 2.62-1.23z" />
                </svg>
                Continue with Apple
              </button>
            </div>
          </div>

          {/* Right Column: Aesthetic Cafe Image */}
          <div className="hidden md:block h-full min-h-[460px]">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85"
                alt="RUPP Cafe interior"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-text-primary/20 to-transparent flex flex-col justify-end p-6 text-bg-primary">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Crafted with care
                </span>
                <p className="mt-1 text-2xl font-semibold leading-tight text-surface">
                  Sip, relax, and elevate your daily coffee experience.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
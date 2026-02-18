"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../../lib/zod";
import { useAuth } from "../../../../service/authService";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import Link from "next/link";

function SignUpPage() {
  const { signupMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const onSubmit = (data) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="w-full flex-1 items-center justify-center text-white max-w-360">
      <div className="relative w-full max-w-6xl">
        <div className="w-full flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 flex items-center justify-center ">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <MessageCircleIcon className="w-12 h-12 mx-auto text-white mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Create Account
                </h2>
                <p className="text-white">Sign up for a new account</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* FULL NAME */}
                <div>
                  <div className="relative">
                    <UserIcon className="auth-input-icon absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                    <input
                      {...register("fullName")}
                      type="text"
                      className={`input pl-10 w-full ${errors.fullName ? "border-red-500" : ""}`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <div className="relative">
                    <MailIcon className="auth-input-icon absolute left-2 top-1/2 -translate-y-1/2 z-1" />
                    <input
                      {...register("email")}
                      type="email"
                      className={`input pl-10 w-full ${errors.email ? "border-red-500" : ""}`}
                      placeholder="johndoe@gmail.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="relative">
                    <LockIcon className="auth-input-icon absolute left-2 top-1/2 -translate-y-1/2 z-1" />
                    <input
                      {...register("password")}
                      type="password"
                      className={`input w-full pl-10 ${errors.password ? "border-red-500" : ""}`}
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  className="auth-btn w-full border border-white h-[40px]"
                  type="submit"
                  disabled={signupMutation.isPending}
                >
                  {signupMutation.isPending ? (
                    <LoaderIcon className="mx-auto h-5 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="auth-link hover:underline">
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
            <div className="text-center">
            
              <h3 className="text-xl font-medium text-cyan-400 mt-6">
                Start Your Journey Today
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;

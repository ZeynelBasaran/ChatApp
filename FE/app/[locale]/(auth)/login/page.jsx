"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../../lib/zod";
import { useAuth } from "../../../../service/authService";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  LoaderIcon,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

function LoginPage() {
  const t = useTranslations('Auth');
  const { loginMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full flex-1 items-center justify-center text-color-primary max-w-360 lg:px-20 md:px-8 px-4">
      <div className="relative w-full max-w-6xl">
        <div className="w-full flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 flex items-center justify-center ">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <MessageCircleIcon className="w-12 h-12 mx-auto text-color-primary mb-4" />
                <h2 className="text-2xl font-bold text-color-primary mb-2">
                  {t('welcomeBackTitle')}
                </h2>
                <p className="text-color-primary opacity-80">{t('welcomeBackSubtitle')}</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* EMAIL */}
                <div>
                  <div className="relative">
                    <MailIcon className="auth-input-icon absolute left-2 top-1/2 -translate-y-1/2 z-1 text-black" />
                    <input
                      {...register("email")}
                      type="email"
                      className={`input pl-10 w-full bg-color-secondary text-black border-color-three ${errors.email ? "border-red-500" : ""}`}
                      placeholder={t('emailPlaceholder')}
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
                    <LockIcon className="auth-input-icon absolute left-2 top-1/2 -translate-y-1/2 z-1 text-black" />
                    <input
                      {...register("password")}
                      type="password"
                      className={`input w-full pl-10 bg-color-secondary text-black border-color-three ${errors.password ? "border-red-500" : ""}`}
                      placeholder={t('passwordPlaceholder')}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                {/* SUBMIT BUTTON */}
                <button
                  className="auth-btn w-full border border-transparent bg-blue-500 text-white h-[45px] hover:opacity-90 transition-all active:scale-95 rounded-sm font-semibold shadow-lg text-[15px]"
                  type="submit"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <LoaderIcon className="mx-auto h-5 animate-spin" />
                  ) : (
                    t('signInButton')
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/signup" className="auth-link hover:underline text-color-primary">
                  {t('dontHaveAccount')}
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-color-secondary rounded-xl m-4">
            <div className="text-center">
            
              <h3 className="text-xl font-medium text-color-five mt-6">
                {t('continueJourney')}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default LoginPage;
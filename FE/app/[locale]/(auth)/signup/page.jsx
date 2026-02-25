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
import { useTranslations } from "next-intl";
import Image from "next/image";

function SignUpPage() {
  const t = useTranslations('Auth');
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
    <div className="w-full flex-1 items-center justify-center text-color-primary max-w-360 lg:px-20 md:px-8 px-4">
      <div className="relative w-full max-w-6xl">
        <div className="w-full flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 flex items-center justify-center ">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <MessageCircleIcon className="w-12 h-12 mx-auto text-color-primary mb-4" />
                <h2 className="text-2xl font-bold text-color-primary mb-2">
                  {t('createAccountTitle')}
                </h2>
                <p className="text-color-primary opacity-80">{t('createAccountSubtitle')}</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* FULL NAME */}
                <div>
                  <div className="relative">
                    <UserIcon className="auth-input-icon absolute left-2 top-1/2 -translate-y-1/2 z-10 text-color-primary" />
                    <input
                      {...register("fullName")}
                      type="text"
                      className={`input pl-10 w-full bg-color-secondary text-color-primary border-color-three ${errors.fullName ? "border-red-500" : ""}`}
                      placeholder={t('fullNamePlaceholder')}
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
                    <MailIcon className="auth-input-icon absolute left-2 top-1/2 -translate-y-1/2 z-1 text-color-primary" />
                    <input
                      {...register("email")}
                      type="email"
                      className={`input pl-10 w-full bg-color-secondary text-color-primary border-color-three ${errors.email ? "border-red-500" : ""}`}
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
                    <LockIcon className="auth-input-icon absolute left-2 top-1/2 -translate-y-1/2 z-1 text-color-primary" />
                    <input
                      {...register("password")}
                      type="password"
                      className={`input w-full pl-10 bg-color-secondary text-color-primary border-color-three ${errors.password ? "border-red-500" : ""}`}
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
                <button
                  className="auth-btn w-full border border-transparent bg-blue-500 text-white h-[45px] hover:opacity-90 transition-all active:scale-95 rounded-sm font-semibold shadow-lg text-[15px]"
                  type="submit"
                  disabled={signupMutation.isPending}
                >
                  {signupMutation.isPending ? (
                    <LoaderIcon className="mx-auto h-5 animate-spin" />
                  ) : (
                    t('createAccountButton')
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="auth-link hover:underline text-color-primary">
                  {t('alreadyHaveAccount')}
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-color-secondary rounded-xl m-4">
            <div className="text-center">

              <h3 className="text-xl font-medium text-color-primary mt-6">
                {t('startJourney')}
              </h3>

              <Image src={"/HeroImage.png"} alt="icon" width={500} height={500} className="w-[500px] h-[500px] rounded-full" />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;

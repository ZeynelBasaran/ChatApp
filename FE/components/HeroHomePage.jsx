import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ChatLandingPage() {
  const t = useTranslations('Landing');
  return (
    <main className="flex-1 flex flex-col items-center h-full justify-center text-center lg:px-20 md:px-8 px-4  mx-auto  max-w-360 ">
      <div className="mt-12 px-4 py-1.5 mb-6 rounded-full bg-color-secondary border border-color-three text-[14px] font-bold text-color-primary tracking-wide uppercase">
        {t('label')}
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl text-color-primary bg-clip-text ">
        {t('title1')}
        <br />
        {t('title2')}
      </h1>

      <p className="mt-8 text-xl text-color-primary max-w-lg leading-relaxed">
        {t('subtitle')}
      </p>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center z-10 max-h-14">
        {/* Sign Up Button (Primary) */}
        <Link
          href="/signup"
          className="w-full sm:w-auto px-10 py-4 border border-transparent bg-blue-500 text-white dark:bg-white dark:text-black rounded-full text-[15px] font-semibold shadow-lg transition-all duration-300 active:scale-95 text-center hover:opacity-90 hover:shadow-xl"
        >
          {t('signUp')}
        </Link>

        {/* Login Button (Secondary - Outline) */}
        <Link
          href="/login"
          className="w-full sm:w-auto px-10 py-4 border border-color-primary text-color-primary hover:text-white hover:border-white hover:bg-purple-600 rounded-full text-[15px] font-semibold bg-transparent transition-all duration-300 active:scale-95 text-center hover:bg-color-primary hover:text-bg-primary shadow-lg"
        >
          {t('login')}
        </Link>
      </div>

    </main>
  );
}

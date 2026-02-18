import React from "react";
import Link from "next/link";

export default function ChatLandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center h-full justify-center text-center px-6   relative overflow-hidden max-w-360 mx-auto">
      <div className="mt-12 px-4 py-1.5 mb-6 rounded-full bg-gray-50 border border-gray-100 text-[14px] font-bold text-gray-500 tracking-wide uppercase">
        Simple • Secure • Fast
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl text-white bg-clip-text ">
        Messaging in its
        <br />
        purest form.
      </h1>

      <p className="mt-8 text-xl text-white max-w-lg leading-relaxed">
        Experience a chat environment designed for clarity. No distractions,
        just meaningful conversations.
      </p>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center z-10 max-h-14">
        <Link
          href="/signup"
          className="w-full sm:w-auto px-10 py-4 border border-white bg-purple-900 text-white rounded-full text-[15px] font-semibold  shadow-lg  transition-all duration-300 active:scale-95 text-center hover:text-black hover:border-primary hover:bg-white"
        >
          Sign Up
        </Link>

        <Link
          href="/login"
          className="w-full sm:w-auto px-10 py-4 border border-black border-dark text-black rounded-full text-[15px] font-semibold bg-indigo-200 transition-all duration-300 active:scale-95 text-center hover:text-white  hover:bg-indigo-300 shadow-lg"
        >
          Login
        </Link>
      </div>

    </main>
  );
}

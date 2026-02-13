import React from 'react'

export default function ChatLandingPage() {
  return (
    <div className=" bg-white text-gray-900 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight max-w-3xl">
          Mesajlaşmanın
          <br />
          en sade hali.
        </h1>

        <p className="mt-6 text-lg text-gray-500 max-w-xl">
          Hızlı, güvenli ve dikkat dağıtmayan bir sohbet deneyimi.
          Sadece konuşmaya odaklan.
        </p>

        <div className="mt-10 flex gap-5">
          <button className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:opacity-90 transition">
            Hemen Başla
          </button>

          <button className="px-8 py-3 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-100 transition">
            Daha Fazla
          </button>
        </div>

      </main>

     
    </div>
  );
}



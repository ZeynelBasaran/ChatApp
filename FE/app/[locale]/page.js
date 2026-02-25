import HeroHomePage from "../../components/HeroHomePage";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import ChatLandingPage from "../../components/ChatLandingPage";

export default async function Home({ params }) {
  // Extract locale
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  // Access the JWT cookie via Next.js server components headers (Server-side rendering check)
  const cookieStore = await cookies();
  const isAuth = cookieStore.has("jwt");

  return (
    <div className="flex-1 flex-col bg-contain w-full">
      {isAuth ? <ChatLandingPage /> : <HeroHomePage />}
    </div>
  );
}


import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import ChatLandingPage from "../../components/ChatLandingPage";
import HeroHomePage from "../../components/HeroHomePage";

export default async function Home({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  // Server-side cookie kontrolü
  // jwt: yerel geliştirmede okunabilir (aynı domain)
  // Netlify+Render production'ında jwt backend domain'ine ait → okunamaz
  // Bu yüzden her iki cookie de kontrol edilir
  const cookieStore = await cookies();
  const isAuth = cookieStore.has("jwt") || cookieStore.has("auth_indicator");

  return isAuth ? <ChatLandingPage /> : <HeroHomePage />;
}

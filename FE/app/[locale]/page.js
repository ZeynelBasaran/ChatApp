import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import HomePageContent from "../../components/HomePageContent";

export default async function Home({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  // Server-side cookie kontrolü
  // jwt: yerel geliştirmede okunabilir (aynı domain)
  // Netlify+Render production'ında jwt backend domain'ine ait → okunamaz
  // Bu yüzden her iki cookie de kontrol edilir
  const cookieStore = await cookies();
  const isAuthServer = cookieStore.has("jwt") || cookieStore.has("auth_indicator");

  return (
    <div className="flex-1 flex-col bg-contain w-full">
      <HomePageContent isAuthServer={isAuthServer} />
    </div>
  );
}

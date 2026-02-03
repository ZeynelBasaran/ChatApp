import { getTranslations } from "next-intl/server";

export default async function Home({ params }) {
  const { locale } = await params;

  console.log("locale", locale);
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return (
    <div className="bg-[url('/chat-app-assets/bgImage.svg')] flex-1  flex-col bg-contain w-full h-full max-w-[1440px]">
      <h1 className="w-full">{t("title")}</h1>

    </div>
  );
}

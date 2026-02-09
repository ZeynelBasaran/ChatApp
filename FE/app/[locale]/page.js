import { getTranslations } from "next-intl/server";
//import { API_BASE_URL } from "../../lib/axios";



export default async function Home({ params }) {


  //console.log("API BASE URL Deneme:", API_BASE_URL); // terminalde görünür

  const { locale } =await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return (
    <div className=" flex-1  flex-col bg-contain w-full h-full ">
      <h1 className="w-full">{t("title")}</h1>

    </div>
  );
}

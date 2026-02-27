import Link from "next/link";
import { Linkedin, Github, Mail } from 'lucide-react';
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import FooterLinks from "./FooterLinks";

const Footer = async () => {
  const t = await getTranslations('Footer');

  // Server-side cookie kontrolü
  // jwt: yerel geliştirmede okunabilir (aynı domain)
  // Netlify+Render production'ında jwt backend domain'ine ait → okunamaz
  // Bu yüzden her iki cookie de kontrol edilir
  const cookieStore = await cookies();
  const isAuthServer = cookieStore.has("jwt") || cookieStore.has("auth_indicator");

  return (
    <footer className="lg:px-20 md:px-8 px-4 py-4  border-t border-gray-200 dark:border-white/10 w-full max-w-360 text-color-primary ">
      <div className="container mx-auto ">

        <div className="md:flex md:justify-between mb-4">
          <Link href={"/"} className="flex gap-x-2 justify-center items-center">
            <Image src={"/İconFoot.png"} alt="icon" width={100} height={100} className="w-[30px] h-[30px] rounded-full" />
            <span className="text-lg font-semibold">  ChatApp</span>
          </Link>

          <div className="grid grid-cols-2  sm:grid-cols-3">
            {/* Client component — hem server cookie hem store'dan auth okur */}
            <FooterLinks
              isAuthServer={isAuthServer}
              linksLabel={t('links')}
              signUpLabel={t('signUp')}
              loginLabel={t('login')}
            />

            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase">
                {t('followMe')}
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/ZeynelBasaran"
                    target="_blank"
                    className="hover:underline"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/zeynelbasaran/"
                    target="_blank"
                    className="hover:underline"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <hr className="py-2 border-base-content/10 dark:border-white/10" />

        <div className="flex flex-col md:flex-row items-center  md:justify-between">
          <span className="text-sm opacity-70">
            © {new Date().getFullYear()} Zeynel Başaran. {t('rightsReserved')}
          </span>

          <div className="flex mt-4 space-x-6 sm:mt-0 ">
            <Link
              href="https://www.linkedin.com/in/zeynelbasaran/"
              target="_blank"
              className="hover:text-blue-500 transition"
            >
              <Linkedin size={22} strokeWidth={1.8} />
            </Link>

            <Link
              href="https://github.com/ZeynelBasaran"
              target="_blank"
              className="hover:text-blue-500 transition"
            >
              <Github size={22} strokeWidth={1.8} />
            </Link>

            <Link
              href="mailto:zeynelbasaran@hotmail.com"
              className="hover:text-blue-500 transition"
            >
              <Mail size={22} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

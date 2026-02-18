import Link from "next/link";
import { Linkedin,Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="p-4  border-t border-base-content/10 w-full max-w-360 text-white ">
      <div className="container mx-auto ">

        <div className="md:flex md:justify-between mb-4">
          <div className=" ">
            <Link href={"/"} className="text-lg font-semibold">
              ChatApp
            </Link>
          </div>

          <div className="grid grid-cols-2  sm:grid-cols-3">
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase">Links</h2>
              <ul className="space-y-2">
                <li>
                  <Link href={"/signup"} className="hover:underline">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href={"/login"} className="hover:underline">
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase">
                Follow Me
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

        <hr className="py-2 border-base-content/10 " />

        <div className="flex flex-col md:flex-row items-center  md:justify-between">
          <span className="text-sm opacity-70">
            © {new Date().getFullYear()} Zeynel Başaran. All Rights Reserved.
          </span>

          <div className="flex mt-4 space-x-6 sm:mt-0 ">
            <Link
              href="https://www.linkedin.com/in/zeynelbasaran/"
              target="_blank"
              className="hover:text-primary transition"
            >
              <Linkedin size={22} strokeWidth={1.8} />
            </Link>

            <Link
              href="https://github.com/ZeynelBasaran"
              target="_blank"
              className="hover:text-primary transition"
            >
              <Github size={22} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../../components/Providers/ThemeProviders";
import { QueryProvider } from "../../components/Providers/Query";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import Navbar from "../../components/Navbar/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "ChatApp - ZB",
    template: "ChatApp - ZB | Next.js Full - Stack Project",
  },
  description:
    "Modern Next.js 16 template with React 19, Tailwind CSS, Zustand, and React Query",
  keywords: ["Next.js", "React", "Tailwind CSS", "Template"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "Next.js Template",
    title: "Next.js Template",
    description:
      "Modern Next.js 16 template with React 19, Tailwind CSS, Zustand, and React Query",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Template",
    description:
      "Modern Next.js 16 template with React 19, Tailwind CSS, Zustand, and React Query",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable}  antialiased`}>
        <NextIntlClientProvider>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              <Navbar />
              {children}
            </ThemeProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

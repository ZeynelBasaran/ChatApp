import Link from "next/link";

import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-500 mb-8">
          {t('description')}
        </p>
        <Link href="/">
          <button>{t('goHome')}</button>
        </Link>
      </div>
    </div>
  );
}


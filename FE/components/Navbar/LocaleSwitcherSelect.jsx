'use client';

import {useParams} from 'next/navigation';
import { useTransition } from 'react';
import {usePathname, useRouter} from '../../i18n/navigation';
import { ChevronDown } from 'lucide-react';

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: nextLocale}
      );
    });
  }

  return (
    <label
      className={`relative flex justify-center items-center ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <p className="sr-only">{label}</p>
      
      {/* 
         - text-color-primary: Light modda Koyu, Dark modda Açık renk olur.
         - border-color-primary: Light modda Koyu, Dark modda Açık renk olur.
         - bg-transparent: Arka plan rengine uyum sağlar.
      */}
      <select
        className="inline-flex appearance-none bg-transparent pl-2 text-color-primary border border-color-primary w-[55px] h-[35px] rounded-lg cursor-pointer focus:outline-none font-medium"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>

      <ChevronDown 
        className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-color-primary" 
        size={16} 
      />
      
    </label>
  );
}
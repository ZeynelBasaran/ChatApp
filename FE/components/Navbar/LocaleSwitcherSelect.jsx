'use client';

import {useParams} from 'next/navigation';
import { useTransition} from 'react';
import {usePathname, useRouter} from '../../i18n/navigation';
import Image from 'next/image';



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
    const nextLocale = event.target.value ;
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
      className={
        `relative text-gray-400     flex justify-center itens-center ${isPending ? 'opacity-50 pointer-events-none' : ''}`
        
      }
    >
      <p className="sr-only text-yellow-300">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent pl-1 text-white border border-white w-[50px] h-[35px] rounded-lg"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>

      <Image src="/svg/arrow.svg" alt="" width="16" height="16" className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      
    </label>
  );
}
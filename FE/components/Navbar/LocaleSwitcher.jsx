import {useLocale, useTranslations} from 'next-intl';
import {routing} from '../../i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {

  //Server Component
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();


  console.log(locale)

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {routing.locales.map((cur) => (
        <option className='text-white' key={cur} value={cur}>
          {t('locale', {locale: cur})}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
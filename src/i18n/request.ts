import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  // Using 'en' as default, but this could easily be expanded to read 
  // from an accept-language header or a cookie if middleware is enabled.
  const locale = 'en';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

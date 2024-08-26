import { ReactNode, useEffect, useState } from 'react';

// third-party
import { IntlProvider, MessageFormatElement } from 'react-intl';

// project-imports
import useConfig from 'hooks/useConfig';
import { I18n } from 'types/config';
import { MenuOrientation, ThemeDirection } from 'config';

// load locales files
const loadLocaleData = (locale: I18n) => {
  switch (locale) {
    // case 'fr':
    //   return import('utils/locales/fr.json');
    // case 'ro':
    //   return import('utils/locales/ro.json');
    // case 'zh':
    //   return import('utils/locales/zh.json');
    case 'ar':
      return import('utils/locales/ar.json');
    case 'en':
    default:
      return import('utils/locales/en.json');
  }
};

interface Props {
  children: ReactNode;
}

// ==============================|| LOCALIZATION ||============================== //

export default function Locales({ children }: Props) {
  const { i18n } = useConfig();
  const { themeDirection, onChangeDirection } = useConfig();

  const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();

  useEffect(() => {
    loadLocaleData(i18n).then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
      setMessages(d.default);
    });

    if (i18n === 'ar') {
      onChangeDirection(ThemeDirection.RTL);
    } else {
      onChangeDirection(ThemeDirection.LTR);
    }

  }, [i18n]);

  return (
    <>
      {messages && (
        <IntlProvider locale={i18n} defaultLocale="en" messages={messages}>
          {children}
        </IntlProvider>
      )}
    </>
  );
}

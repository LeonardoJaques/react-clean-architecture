import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationPT from './locales/pt-BR.json';
import translationEN from './locales/en-US.json';

const resources = {
  'pt-BR': translationPT,
  'en-US': translationEN,
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR', // idioma default
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

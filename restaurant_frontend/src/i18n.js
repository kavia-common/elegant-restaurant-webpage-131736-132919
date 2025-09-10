import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Load translation using http backend
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    // Backend options
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Available languages
    supportedLngs: ['en', 'es'],
    
    // Namespace configuration
    ns: ['common', 'menu', 'events', 'reviews', 'reservation', 'newsletter', 'loyalty', 'chefs-special'],
    defaultNS: 'common',
  });

export default i18n;

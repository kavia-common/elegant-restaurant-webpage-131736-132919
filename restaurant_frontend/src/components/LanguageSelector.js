import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * PUBLIC_INTERFACE
 * Language selector component for switching between supported languages.
 * Features dropdown selection, current language display, accessibility support,
 * and persistence via localStorage.
 */
function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = useCallback((event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
  }, [i18n]);

  const currentLanguage = i18n.language;
  const supportedLanguages = i18n.options.supportedLngs.filter(lng => lng !== 'cimode');

  return (
    <div className="language-selector">
      <label htmlFor="language-select" className="sr-only">
        {t('language_selector.select_language')}
      </label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={handleLanguageChange}
        className="language-select"
        aria-label={`${t('language_selector.current_language', { language: t(`language_selector.languages.${currentLanguage}`) })}`}
        title={t('language_selector.select_language')}
      >
        {supportedLanguages.map((lng) => (
          <option key={lng} value={lng}>
            {t(`language_selector.languages.${lng}`)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;

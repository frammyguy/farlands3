import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./en/lang.json";
import translationRU from "./ru/lang.json";
import translationLV from "./lv/lang.json";
import { Form } from "react-bootstrap";

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
  lv: {
    translation: translationLV,
  },
};
  
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "ru",
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <Form.Select
      className="btn btn-light"
      value={i18n.language}
      onChange={handleLanguageChange}
    >
      <option value="en">English</option>
      <option value="lv">Latviešu</option>
      <option value="ru">Русский</option>
    </Form.Select>
  );
};

export default function useCustomTranslation () {
  return useTranslation();
}

export { LanguageSwitcher };
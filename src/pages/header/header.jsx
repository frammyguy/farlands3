import React from 'react';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import translationEN from '../../locales/en/translation.json';
import translationRU from '../../locales/ru/translation.json';
import translationLV from '../../locales/lv/translation.json';
import './header.sass';
import Logo from './logo.png';

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

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
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
        <Form.Select className='btn btn-light' value={i18n.language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="lv">Latviešu</option>
            <option value="ru">Русский</option>
        </Form.Select>
    );
};

const WrappedLink = ({ url, linkClass = "", buttonClass, buttonTitle }) => {
    return (
      <Link className={linkClass} to={url}>
        <Button className={buttonClass}>{buttonTitle}</Button>
      </Link>
    );
  };

export default function Header() {
  const { t } = useTranslation();
  return (
    <header>
        <a className="logo" href='/'>
            <img src={Logo} alt="logo" />
            <div className="logo_text">Farlands</div>
        </a>
        <div className="header_buttons">
            <WrappedLink
            url="http://31.214.166.21:8100/"
            linkClass="header_buttons_link"
            buttonClass="btn btn-dark"
            buttonTitle={t('map')}
            />
            <WrappedLink
            url="rules"
            linkClass="header_buttons_link"
            buttonClass="btn btn-dark"
            buttonTitle={t('rules')}
            />
        </div>
            <LanguageSwitcher />
    </header>
  );
}
import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";

import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../../locales/en/lang.json";
import translationRU from "../../locales/ru/lang.json";
import translationLV from "../../locales/lv/lang.json";

import "./header.sass";
import Logo from "./logo.png";

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

export default function Header() {
  const { t } = useTranslation();
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container className="">
        <Navbar.Brand href="/">
          <img
            alt="Farlands logo"
            src={Logo}
            className="d-inline-block align-top"
          />{" "}
          Farlands
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">{t("main")}</Nav.Link>
            <Nav.Link href="/rules">{t("rules")}</Nav.Link>
            <Nav.Link href="https://www.donationalerts.com/r/farlandsmc">
              {t("donations")}
            </Nav.Link>
            <NavDropdown title={t("forPlayers")} id="collapsible-nav-dropdown">
              <NavDropdown.Item href="http://31.214.166.21:8100/">
                {t("map")}
              </NavDropdown.Item>
              <NavDropdown.Item href="/features">
                {t("features")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link>
              <LanguageSwitcher />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
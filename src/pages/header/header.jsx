import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./header.sass";
import useCustomTranslation from "../../locales/useCustomTranslation";
import { LanguageSwitcher } from "../../locales/useCustomTranslation";
import Logo from "../../img/logo.png";

export default function Header() {
  const { t } = useCustomTranslation();
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
            <Nav.Link disabled href="">{t("rules")}</Nav.Link>
            <Nav.Link href="https://www.donationalerts.com/r/farlandsmc">
              {t("donations")}
            </Nav.Link>
            <NavDropdown title={t("forPlayers")} id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/news">
                {t("news")}
              </NavDropdown.Item>
              <NavDropdown.Item disabled href="/map">
                {t("map")}
              </NavDropdown.Item>
              <NavDropdown.Item disabled href="">
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
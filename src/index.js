import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.sass';
import Header from './pages/header/header';
import Main from './pages/main/main';
import News from './pages/news/news';
import Footer from './pages/footer/footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/news" element={<News />} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);

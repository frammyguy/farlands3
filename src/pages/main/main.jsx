import React from "react";
import { useEffect } from "react";
import axios from "axios";

import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../../locales/en/lang.json";
import translationRU from "../../locales/ru/lang.json";
import translationLV from "../../locales/lv/lang.json";

import "./main.sass";
import First from "./first/first";
import Benefits from "./benefits/benefits";
import Countries from "./countries/countries";
import Admin from "./admin/admin";

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


export default function Main() {
  const { t } = useTranslation();
  // const [news, setNews] = React.useState([]);
  const [countries, setCountries] = React.useState([]);

  // const fetchNews = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://scanditestframmy.000webhostapp.com/php/getNews.php",
  //       {}
  //     );
  //     if (res.data) {
  //       const data = res.data.split("\n");
  //       const l = [];
  //       data.forEach((e) => {
  //         const row = e.split("\t");
  //         const obj = {
  //           ID: row[0],
  //           Author: row[1],
  //           Date: row[2],
  //           Title: row[3],
  //           Description: row[4],
  //           Likes: row[5],
  //           Dislikes: row[6],
  //           Comments: row[7],
  //         };
  //         if (l.length < 3) l.push(obj);
  //       });
  //       setNews(l);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        "https://scanditestframmy.000webhostapp.com/php/getCountries.php",
        {}
      );
      if (res.data) {
        const data = res.data.split("\n");
        const c = [];
        data.forEach((e) => {
          const row = e.split("\t");
          const obj = {
            ID: row[0],
            Name: row[1],
            Mayor: row[2],
            Money: row[3],
            Players: row[4],
            Created: row[5],
            Flag: row[6],
            Capital: row[7],
            BG: row[8],
          };
          if (c.length < 3) c.push(obj);
        });
        setCountries(c);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // fetchNews();
    fetchCountries();
  }, []);

  return (
    <div>
      <First t={t} />
      <Benefits t={t} />
      <Countries t={t} countries={countries} />
      <Admin t={t} />
      {/* <News t={t} news={news} /> */}
    </div>
  );
}
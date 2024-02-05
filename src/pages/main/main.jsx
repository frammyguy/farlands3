import React from "react";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../../locales/en/translation.json";
import translationRU from "../../locales/ru/translation.json";
import translationLV from "../../locales/lv/translation.json";
import "./main.sass";

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

function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  const interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  if (interval === 1) {
    return interval + " year ago";
  }

  const months = Math.floor(seconds / 2628000);
  if (months > 1) {
    return months + " months ago";
  }
  if (months === 1) {
    return months + " month ago";
  }

  const days = Math.floor(seconds / 86400);
  if (days > 1) {
    return days + " days ago";
  }
  if (days === 1) {
    return days + " day ago";
  }

  const hours = Math.floor(seconds / 3600);
  if (hours > 1) {
    return hours + " hours ago";
  }
  if (hours === 1) {
    return hours + " hour ago";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes > 1) {
    return minutes + " minutes ago";
  }
  if (minutes === 1) {
    return minutes + " minute ago";
  }

  return "just now";
}

export default function Main() {
  const { t } = useTranslation();
  const [news, setNews] = React.useState([]);
  const [countries, setCountries] = React.useState([]);

  const fetchNews = async () => {
    try {
      const res = await axios.get(
        "http://farlands.getenjoyment.net/getNews.php",
        {}
      );
      if (res.data) {
        const data = res.data.split("\n");
        const l = [];
        data.forEach((e) => {
          const row = e.split("\t");
          const obj = {
            ID: row[0],
            Author: row[1],
            Date: row[2],
            Title: row[3],
            Description: row[4],
            Likes: row[5],
            Dislikes: row[6],
            Comments: row[7],
          };
          if (l.length < 3) l.push(obj);
        });
        setNews(l);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        "http://farlands.getenjoyment.net/getCountries.php",
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
    fetchNews();
    fetchCountries();
  }, []);

  return (
    <div className="main">
      <h1 className="main_title">{t("news")}</h1>
      <section className="main_cards">
        {news.length ? (
          news.map((list, i) =>
            list.Author ? (
              <Card
                bg="dark"
                key={i}
                text="white"
                style={{ width: "18rem" }}
                className="main_post w-75"
              >
                <Card.Header>
                  <img
                    className="main_post_head"
                    src={"https://mc-heads.net/avatar/" + list.Author + "/100"}
                    alt="head"
                  />
                  {list.Author}
                </Card.Header>
                <Card.Body>
                  <h2>{list.Title}</h2>

                  {list.Description.split("%#").map((e) => (
                    <Card.Text>
                      {e[0] === "i" ? (
                        <img
                          src={e.substring(4)}
                          alt="img"
                          className="main_post_img"
                        />
                      ) : null}
                      {e[0] === "t" ? (
                        <div className="main_post_text">{e.substring(1)}</div>
                      ) : null}
                    </Card.Text>
                  ))}
                </Card.Body>
                <Card.Footer>
                  <small className="text">{timeAgo(new Date(list.Date))}</small>
                </Card.Footer>
              </Card>
            ) : null
          )
        ) : (
          <p>{t("loading...")}</p>
        )}
      </section>

      <section className="countries">
        <Carousel className="w-100" fade>
          {countries.length ? (
            countries.map((list, i) =>
              list.Name ? (
                <Carousel.Item className="w-100">
                  <img src={list.Flag} alt="flag" />
                  <Carousel.Caption>
                    <h3>{list.Name}</h3>
                    <p>
                      {list.Players.substring(0, list.Players.length - 1)}
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              ) : // <Card
              //   bg="dark"
              //   key={i}
              //   text="white"
              //   style={{ width: "18rem" }}
              //   className="main_post w-75"
              // >
              //   <Card.Header>
              //     <img
              //       className="main_post_head"
              //       src={"https://mc-heads.net/avatar/" + list.Mayor + "/100"}
              //       alt="head"
              //     />
              //     {list.Mayor}
              //   </Card.Header>
              //   <Card.Body>
              //     <h2>{list.Name}</h2>
              //       <Card.Text>
              //           <img
              //             src={list.Flag}
              //             alt="img"
              //             className="main_post_img"
              //           />
              //       </Card.Text>
              //   </Card.Body>
              //   <Card.Footer>
              //     <small className="text">{timeAgo(new Date(list.Date))}</small>
              //   </Card.Footer>
              // </Card>
              null
            )
          ) : (
            <p>{t("loading...")}</p>
          )}
        </Carousel>
      </section>
    </div>
  );
}

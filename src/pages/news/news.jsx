import React from "react";
import { useEffect } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import useCustomTranslation from "../../locales/useCustomTranslation";
import "./news.sass";

export default function News() {
  const { t } = useCustomTranslation();
  const [news, setNews] = React.useState([]);

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
  
    const interval = Math.floor(seconds / 31536000);
  
    if (interval === 1) {
      return (t("lvTime") + interval + t("year1"));
    }
    if (interval >= 2 && interval <= 4) {
      return (t("lvTime") + interval + t("year2"));
    }
    if (interval > 4) {
      if (interval%10 === 1) {
        return (t("lvTime") + interval + t("year&1"));
      }
      if (interval%10 >= 2 && interval%10 <= 4) {
        return (t("lvTime") + interval + t("year&2"));
      }
      return (t("lvTime") + interval + t("years"));
    }
  
    const months = Math.floor(seconds / 2628000);

    if (months === 1) {
      return (t("lvTime") + months + t("month1"));
    }
    if (months >= 2 && months <= 4) {
      return (t("lvTime") + months + t("month2"));
    }
    if (months > 4) {
      if (months%10 === 1) {
        return (t("lvTime") + months + t("month&1"));
      }
      if (months%10 >= 2 && months%10 <= 4) {
        return (t("lvTime") + months + t("month&2"));
      }
      return (t("lvTime") + months + t("months"));
    }

    const weeks = Math.floor(seconds / 604800);

    if (weeks === 1) {
      return (t("lvTime") + weeks + t("week1"));
    }
    if (weeks >= 2 && weeks <= 4) {
      return (t("lvTime") + weeks + t("week2"));
    }
    if (weeks > 4) {
      if (weeks%10 === 1) {
        return (t("lvTime") + weeks + t("week&1"));
      }
      if (weeks%10 >= 2 && weeks%10 <= 4) {
        return (t("lvTime") + weeks + t("week&2"));
      }
      return (t("lvTime") + weeks + t("weeks"));
    }
  
    const days = Math.floor(seconds / 86400);

    if (days === 1) {
      return (t("lvTime") + days + t("day1"));
    }
    if (days >= 2 && days <= 4) {
      return (t("lvTime") + days + t("day2"));
    }
    if (days > 4) {
      if (days%10 === 1) {
        return (t("lvTime") + days + t("day&1"));
      }
      if (days%10 >= 2 && days%10 <= 4) {
        return (t("lvTime") + days + t("day&2"));
      }
      return (t("lvTime") + days + t("days"));
    }
  
    const hours = Math.floor(seconds / 3600);

    if (hours === 1) {
      return (t("lvTime") + hours + t("hour1"));
    }
    if (hours >= 2 && hours <= 4) {
      return (t("lvTime") + hours + t("hour2"));
    }
    if (hours > 4) {
      if (hours%10 === 1) {
        return (t("lvTime") + hours + t("hour&1"));
      }
      if (hours%10 >= 2 && hours%10 <= 4) {
        return (t("lvTime") + hours + t("hour&2"));
      }
      return (t("lvTime") + hours + t("hours"));
    }
  
    const minutes = Math.floor(seconds / 60);

    if (minutes === 1) {
      return (t("lvTime") + minutes + t("minute1"));
    }
    if (minutes >= 2 && minutes <= 4) {
      return (t("lvTime") + minutes + t("minute2"));
    }
    if (minutes > 4) {
      if (minutes%10 === 1) {
        return (t("lvTime") + minutes + t("minute&1"));
      }
      if (minutes%10 >= 2 && minutes%10 <= 4) {
        return (t("lvTime") + minutes + t("minute&2"));
      }
      return (t("lvTime") + minutes + t("minutes"));
    }
  
    return "just now";
  }

  const fetchNews = async () => {
    try {
      const res = await axios.get(
        "https://scanditestframmy.000webhostapp.com/php/getNews.php",
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

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="news">
      <h1 className="news_title">{t('news')}</h1>
      <Container>
        <Row>
          {news.length ? (
            news.map((list, i) =>
              list.Author ? (
                <Row className="news_cards">
                  <Card
                    key={i}
                    text="white"
                    style={{ width: "18rem" }}
                    className="news_post w-75"
                  >
                    <Card.Body>
                      <h2 className="news_post_title">{list.Title}</h2>

                      {list.Description.split("%#").map((e) =>
                        e.length > 0 ? (
                          <Card.Text>
                            {e[0] === "i" ? (
                              <img
                                src={e.substring(4)}
                                alt="img"
                                className="news_post_img"
                              />
                            ) : null}
                            {e[0] === "t" ? (
                              <div className="news_post_text">
                                {e.substring(1)}
                              </div>
                            ) : null}
                          </Card.Text>
                        ) : null
                      )}
                    </Card.Body>
                    <Card.Footer>
                      <Card.Header className="news_post_header">
                        {list.Author}
                        <img
                          className="news_post_head"
                          src={
                            "https://mc-heads.net/avatar/" +
                            list.Author +
                            "/100"
                          }
                          alt="head"
                        />
                      </Card.Header>
                      <small>
                        {timeAgo(new Date(list.Date))}
                      </small>
                    </Card.Footer>
                  </Card>
                </Row>
              ) : null
            )
          ) : (
            <p>{t("loading")}</p>
          )}
        </Row>
      </Container>
    </div>
  );
}

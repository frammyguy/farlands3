import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import "./news.sass";

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

export default function News(props) {
  return (
    <div className="news">
      <Container>
        <Row>
          {props.news.length ? (
            props.news.map((list, i) =>
              list.Author ? (
                <Row className="news_cards">
                  <Card
                    border="primary"
                    bg="dark"
                    key={i}
                    text="white"
                    style={{ width: "18rem" }}
                    className="news_post w-75"
                  >
                    <Card.Body>
                      <h2>{list.Title}</h2>

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
                      <Card.Header>
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
            <p>{props.t("loading")}</p>
          )}
        </Row>
      </Container>
    </div>
  );
}

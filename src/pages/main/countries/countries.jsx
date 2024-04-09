import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./countries.sass";

const slideNavFunc = () => {
  let slideNav = document.querySelectorAll(".slide-nav");
  slideNav.forEach((el) => {
    el.addEventListener("click", function () {
      slideNav.forEach((el) => {
        el.classList.remove("active");
        let current = document.getElementsByClassName("flex--active")[0].dataset.slide;
        let next = this.dataset.slide;
        if (current === next) {
          return false;
        } else {
          document
            .querySelector(".blocks")
            .querySelector(".country[data-slide='" + next + "']")
            .classList.add("flex--preStart");
          document
            .querySelector(".flex--active")
            .classList.add("animate--end");
          setTimeout(function () {
            document
              .querySelector(".flex--preStart")
              .classList.remove("animate--start", "flex--preStart")
              .classList.add("flex--active");
            document
              .querySelector(".animate--end")
              .classList.add("animate--start")
              .classList.remove("animate--end", "flex--active");
          }, 100);
        }
      });
      this.classList.add("active");
    });
  });
};


export default function Countries(props) {
  
  slideNavFunc();
  return (
    <div className="countrylist">
      <Container>
        <Row className="blocks">
          <Col xs={1} className="slider__navi">
            {props.countries.length
              ? props.countries.map((list, i) =>
                  list.Mayor ? (
                    <Link
                      to="#"
                      className={i === 0 ? "slide-nav active" : "slide-nav"}
                      data-slide={i}
                      key={i}
                    >
                      {list.Mayor}
                    </Link>
                  ) : null
                )
              : null}
          </Col>
          <Col xs={11} className="countries position-relative">
            {props.countries.length
              ? props.countries.map((list, i) =>
                  list.Mayor ? (
                    <div
                      className={"country position-absolute border border-dark rounded-5" + (i === 0 ? " flex--active" : " animate--start")}
                      data-slide={i}
                      key={i}
                      style={{
                        background: `url(${list.BG}) center center/cover no-repeat`,
                      }}
                    >
                      <div className="country_box position-relative">
                        <div className="country_info">
                          
                          <div className="country_name"><img className="country_flag" src={list.Flag} alt="country flag" />{list.Name}</div>
                          <div className="country_mayor country_descr cities">
                            {props.t('mayor')}: {list.Mayor}
                          </div>
                          <div className="country_descr">
                            {props.t('villagers')}: {list.Players.substring(0, list.Players.length-1)}
                          </div>
                          <div className="country_descr">
                            <br />
                            {list.Description.replaceAll('. ', ".\n")}
                          </div>
                        </div>
                        <div className="country_skin">
                          <div className="country_pres">{list.Mayor}</div>
                          <img src={
                            "https://mc-heads.net/body/" +
                            list.Mayor
                          } alt="mayor skin" />
                        </div>
                      </div>
                    </div>
                  ) : null
                )
              : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

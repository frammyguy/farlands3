import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./countries.sass";

const slideNavFunc = () => {
  $('.slide-nav').on('click', function(e) {
      e.preventDefault();
      // get current slide
      var current = $('.flex--active').data('slide'),
      // get button data-slide
      next = $(this).data('slide');
  
      $('.slide-nav').removeClass('active');
      $(this).addClass('active');
    
      if (current === next) {
        return false;
      } else {
        $('.blocks').find('.country[data-slide=' + next + ']').addClass('flex--preStart');
        $('.flex--active').addClass('animate--end');
        setTimeout(function() {
          $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
          $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
        }, 100);
      }
    });
}

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
                          <div className="country_name">{list.Name}</div>
                          <div className="country_descr cities">
                            {list.Mayor}
                          </div>
                          <div className="country_descr">
                            Жители: {list.Players}
                          </div>
                          {/* <div className="country_descr">
                            <img src={list.Flag} alt="country flag" />
                          </div> */}
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

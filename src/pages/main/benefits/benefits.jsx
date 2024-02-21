import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Castle from "../../../img/castle.svg";
import Gear from "../../../img/gear.svg";
import Money from "../../../img/money.svg";
import Refresh from "../../../img/refresh.svg";
import Server from "../../../img/server.svg";
import Trust from "../../../img/trust.svg";
import "./benefits.sass";

function Advice(props) {
  return (
    <Col md={5} className="advice">
      <div className="advice_img">
        <img src={props.logo} alt="gear icon" />
      </div>
      <div>
        <div className="advice_title">{props.title}</div>
        <div className="advice_subtitle">{props.desc}</div>
      </div>
    </Col>
  );
}

export default function Benefits(props) {
  return (
    <div className="benefits">
      <Container>
        <Row className="comments">
          <div className="advice_title_main text-center">{props.t("promo")}</div>
          <div className="advice_subtitle_main text-center">
            {props.t("promo_desc")}
          </div>
        </Row>
        <Row>
          <Advice
            logo={Gear}
            title={props.t("gear_title")}
            desc={props.t("gear_desc")}
          />
          <Col md={2} />
          <Advice
            logo={Refresh}
            title={props.t("refresh_title")}
            desc={props.t("refresh_desc")}
          />
          <Advice
            logo={Server}
            title={props.t("server_title")}
            desc={props.t("server_desc")}
          />
          <Col md={2} />
          <Advice
            logo={Castle}
            title={props.t("castle_title")}
            desc={props.t("castle_desc")}
          />
          <Advice
            logo={Trust}
            title={props.t("trust_title")}
            desc={props.t("trust_desc")}
          />
          <Col md={2} />
          <Advice
            logo={Money}
            title={props.t("money_title")}
            desc={props.t("money_desc")}
          />
        </Row>
      </Container>
    </div>
  );
}

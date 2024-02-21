import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./first.sass";

export default function First(props) {
  return (
    <div className="main">
      <Container>
        <div className="main-logo">FarLands</div>
        <div
          id="subs_click"
          className="main_desc text-light text-opacity-75 text-center"
        >
          {props.t("joinNplay")}
        </div>
        <Link
          to="https://forms.gle/8FTrE67FK2GV83Gb9"
          className="btn btn-outline-light d-grid mx-auto col-6 col-sm-5 col-md-6 col-lg-3 col-xl-2 mt-5"
        >
          {props.t("apply")}
        </Link>
      </Container>
    </div>
  );
}

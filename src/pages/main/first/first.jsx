import React from "react";
import { useState } from "react";
import axios from "axios";

import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import "./first.sass";
import useCustomTranslation from "../../../locales/useCustomTranslation";

export default function First(props) {
  const { t } = useCustomTranslation();
  const [show, setShow] = useState(false);
  const state = {
    name: "",
    age: "",
    telegram: "",
    link: "",
    referal: "",
    nickname: "",
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        state.name = event.target.value;
        break;
      case "age":
        state.age = event.target.value;
        break;
      case "telegram":
        state.telegram = event.target.value;
        break;
      case "link":
        state.link = event.target.value;
        break;
      case "referal":
        state.referal = event.target.value;
        break;
      case "nickname":
        state.nickname = event.target.value;
        break;
      default:
        break;
    }
    console.log(state);
  };

  const handleSubmit = (event) => {
    try {
      axios.post(
        "https://files.farlands.co/addUser.php?name=" +state.name + "&age=" + state.age + "&telegram=" + state.telegram + "&link=" + state.link + "&referal=" + state.referal + "&nickname=" + state.nickname
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      <Modal variant="dark" show={show} onHide={handleClose}>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>{t("modal_name")}</Form.Label>
              <Form.Control
                name="name"
                type="text"
                required
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("modal_age")}</Form.Label>
              <Form.Control
                name="age"
                type="number"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("modal_telegram")}</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  name="telegram"
                  type="text"
                  required
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("modal_link")}</Form.Label>
              <Form.Control
                name="link"
                type="text"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("modal_referal")}</Form.Label>
              <Form.Control
                name="referal"
                type="text"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("modal_nickname")}</Form.Label>
              <Form.Control
                name="nickname"
                type="text"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      ;
      <Container>
        <h5 className="main-logo-above">сервер реально супер крутой</h5>
        <h1 className="main-logo">FarLands</h1>
        <div
          id="subs_click"
          className="main_desc text-light text-opacity-75 text-center"
        >
          {props.t("joinNplay")}
        </div>
        <Button
          variant="outline-light"
          onClick={handleShow}
          className="d-grid mx-auto col-6 col-sm-5 col-md-6 col-lg-3 col-xl-2 mt-5"
        >
          {props.t("apply")}
        </Button>
      </Container>
    </div>
  );
}

import React from "react";
import { useState } from "react";

import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import "./first.sass";
import useCustomTranslation from "../../../locales/useCustomTranslation";

export default function First(props) {
  const { t } = useCustomTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="main">
      <Modal variant="dark" size="lg" show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{t('modal_name')}</Form.Label>
              <Form.Control
                type="text"
                required
                autoFocus
              />
              <Form.Label>{t('modal_age')}</Form.Label>
              <Form.Control
                type="number"
                required
              />
              <Form.Label>{t('modal_telegram')}</Form.Label>
              <Form.Control
                type="text"
                required
              />
              <Form.Label>{t('modal_link')}</Form.Label>
              <Form.Control
                type="text"
                required
              />
              <Form.Label>{t('modal_referal')}</Form.Label>
              <Form.Control
                type="text"
              />
              <Form.Label>{t('modal_nickname')}</Form.Label>
              <Form.Control
                type="text"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      ;
      <Container>
        <div className="main-logo">FarLands</div>
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

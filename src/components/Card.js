import React, { Component } from "react";
import { Card, Button, Modal, CardGroup } from "react-bootstrap";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { StylesProvider } from "@material-ui/core";
const style = {
  layout: {
    marginTop: "30px",
  },
  Img: {
    minwidth: "260px",
    minHeight: "220px",
    maxwidth: "260px",
    maxHeight: "220px",
  },
  span: {
    marginBottom: "7px",
  },
};

class Cardi extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      setShow: false,
    };
  }
  render() {
    const { show, setShow } = this.state;

    const handleClose = () => {
      this.setState({
        show: false,
      });
    };
    const handleShow = () => {
      this.setState({
        show: true,
      });
    };
    const {
      oglas: { naslov, body, datum, imgUrl, korisnik, cena },
    } = this.props;
    dayjs.extend(relativeTime);
    return (
      <div>
        <CardGroup>
          <Card size="lg" style={style.layout}>
            <Card.Img style={style.Img} variant="top" src={imgUrl} />
            <Card.Body>
              <Card.Title>{naslov}</Card.Title>

              <Button variant="outlined-primary" onClick={handleShow}>
                {" "}
                <UnfoldMoreIcon />{" "}
              </Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{dayjs(datum).fromNow()}</small>
            </Card.Footer>
          </Card>
        </CardGroup>
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <PermIdentityIcon style={style.span} fontSize="large" />{" "}
                <span>{korisnik}</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {body}
              <br />
              <br />
              <LocalOfferIcon /> Cena: <b>{cena}</b>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </>
      </div>
    );
  }
}

export default Cardi;

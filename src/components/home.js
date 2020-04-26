import React, { Component } from "react";
import { Container, Row, Col, Footer } from "react-bootstrap";
import Card from "./Card";
import axios from "axios";

const style = {
  kolone: {},
};

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oglasi: [],
      show: false,
      setShow: false,
    };
  }

  componentDidMount() {
    axios
      .get("/PreuzmiOglase")
      .then((res) => {
        this.setState({
          oglasi: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let recentOglasiMarkup = this.state.oglasi ? (
      this.state.oglasi.map((oglas) => (
        <Col key={oglas.oglasId} sm={3} style={style.kolone} offset={2}>
          <Card key={oglas.oglasId} oglas={oglas} />
        </Col>
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Container>
        <Row>{recentOglasiMarkup}</Row>
      </Container>
    );
  }
}

export default home;

import React, { Component } from "react";
import { Container, Row, Col, CardDeck } from "react-bootstrap";
import Card2 from "../components/Card2";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const style = {
  kolone: {},
};

class oglasiKorisnika extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oglasi: [],
      show: false,
      setShow: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("FBIdToken")) {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "FBIdToken"
      );
    }
    axios
      .get(`/oglasi/${this.props.user.user.handle}`)
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
          <Card2 key={oglas.oglasId} oglas={oglas} />
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

oglasiKorisnika.propTypes = {
  user: PropTypes.object.isRequired,
  oglas: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  user: state.user,
  oglas: state.oglas,
});

export default connect(mapStatetoProps, null)(oglasiKorisnika);

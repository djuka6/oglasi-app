import React, { Component } from "react";
import { Form, Container, Col, Row } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { postaviOglase } from "../redux/actions/dataActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const styles = {
  progress: {
    position: "absolute",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
};

class postaviOglas extends Component {
  constructor() {
    super();
    this.state = {
      body: "",
      naslov: "",
      cena: "0$",
      loading: false,
      errors: {},
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const oglasData = {
      naslov: this.state.naslov,
      body: this.state.body,
      cena: this.state.cena,
    };
    console.log(oglasData);
    this.props.postaviOglase(oglasData, this.props.history);
  };
  render() {
    const { errors, loading } = this.state;

    return (
      <div>
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <br />
              <Form noValidate onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Naslov</Form.Label>
                  <TextField
                    id="naslov"
                    name="naslov"
                    type="text"
                    label="Naslov oglasa"
                    style={styles.textField}
                    helperText={errors.naslov}
                    error={errors.naslov ? true : false}
                    value={this.state.naslov}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Nesto vise o oglasu</Form.Label>
                  <TextField
                    id="outlined-multiline-static"
                    name="body"
                    type="text"
                    label="Nesto vise:"
                    style={styles.textField}
                    multiline
                    rows={4}
                    helperText={errors.body}
                    error={errors.body ? true : false}
                    value={this.state.body}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Cena</Form.Label>
                  <TextField
                    id="cena"
                    name="cena"
                    type="text"
                    label="Cena oglasa:"
                    style={styles.textField}
                    helperText={errors.cena}
                    error={errors.cena ? true : false}
                    value={this.state.cena}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Form.Group>
                {errors.general && (
                  <Typography variant="body2" style={styles.customError}>
                    {errors.general}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={styles.button}
                  disabled={loading}
                >
                  Postavi
                  {loading && (
                    <CircularProgress size={30} style={styles.progress} />
                  )}
                </Button>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

postaviOglas.propTypes = {
  postaviOglase: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  oglas: state.oglas,
});
export default connect(mapStateToProps, { postaviOglase })(postaviOglas);

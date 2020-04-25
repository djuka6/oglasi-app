import React, { Component } from "react";
import { Form, Container, Col, Row } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/userActions";
import PropTypes from "prop-types";

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

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
      console.log(this.state.errors);
    }
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

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.getUser(userData, this.props.history);
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <div>
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <br />
              <Form noValidate onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    style={styles.textField}
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    style={styles.textField}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password}
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
                  Login
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
login.propTypes = {
  getUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStatetoProps, { getUser })(login);

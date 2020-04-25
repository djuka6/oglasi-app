import React, { Component } from "react";
import { Form, Container, Col, Row } from "react-bootstrap";
import { signupUser } from "../redux/actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UIReducer from "../redux/reducers/UIReducer";

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

class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      location: "",
      phoneNumber: "",
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
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
      location: this.state.location,
      phoneNumber: this.state.phoneNumber,
    };
    console.log(userData);
    this.props.signupUser(userData, this.props.history);
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
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

              <Form.Group controlId="formBasicPassword">
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confrim password"
                  style={styles.textField}
                  helperText={errors.confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  fullWidth
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <TextField
                  id="handle"
                  name="handle"
                  type="text"
                  label="Username"
                  style={styles.textField}
                  helperText={errors.handle}
                  error={errors.handle ? true : false}
                  value={this.state.handle}
                  onChange={this.handleChange}
                  fullWidth
                />
                <Form.Text className="text-muted">
                  Username must be unique.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <TextField
                  id="location"
                  name="location"
                  type="text"
                  label="Location"
                  style={styles.textField}
                  helperText={errors.location}
                  error={errors.location ? true : false}
                  value={this.state.location}
                  onChange={this.handleChange}
                  fullWidth
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  label="Phone number:"
                  style={styles.textField}
                  helperText={errors.phoneNumber}
                  error={errors.phoneNumber ? true : false}
                  value={this.state.phoneNumber}
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
                Sign up
                {loading && (
                  <CircularProgress size={30} style={styles.progress} />
                )}
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStatetoProps, { signupUser })(signup);

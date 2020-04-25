import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Button } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const styles = {
  marginLeft: "auto",
  signup: {
    marginRight: "10%",
  },
};

class NavBar extends Component {
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg" sticky="top">
          <Navbar.Brand>
            <Button component={Link} to="/">
              <HomeOutlinedIcon /> OglasiApp
            </Button>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Button component={Link} to="/oglasiKorisnika">
              <ShoppingCartOutlinedIcon /> Oglasi
            </Button>
            <Button component={Link} to="/postaviOglas">
              <AddCircleOutlineOutlinedIcon /> Postavi oglas
            </Button>
            <AccountCircleOutlinedIcon /> {this.props.user.user.handle}
            <Button
              style={styles}
              onClick={() => {
                this.props.logoutUser();
              }}
            >
              <ExitToAppOutlinedIcon /> Log out
            </Button>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func,
  authenticated: PropTypes.object,
  user: PropTypes.object,
};

const mapStatetoProps = (state) => ({
  authenticated: state.authenticated,
  user: state.user,
});

export default connect(mapStatetoProps, { logoutUser })(NavBar);

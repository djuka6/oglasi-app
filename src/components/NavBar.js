import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Button } from "@material-ui/core";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import { Link } from "react-router-dom";
import HowToRegOutlinedIcon from "@material-ui/icons/HowToRegOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
const styles = {
  marginLeft: "auto",

  signup: {
    marginRight: "10%",
  },
  ikonica: {
    marginRight: "2px",
  },
};

class NavBar extends Component {
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg" sticky="top">
          <Navbar.Brand>
            <Button variant="outlined" component={Link} to="/">
              <HomeOutlinedIcon /> OglasiApp
            </Button>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Button
              //variant="link"
              style={styles.signup}
              component={Link}
              to="/signup"
            >
              <HowToRegOutlinedIcon /> Sign up
            </Button>
            <Button //variant="link"
              style={styles}
              component={Link}
              to="/login"
            >
              <VpnKeyOutlinedIcon style={styles.ikonica} /> Log in
            </Button>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;

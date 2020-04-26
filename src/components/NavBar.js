import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
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
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand>
            <Button component={Link} to="/">
              <HomeOutlinedIcon /> OglasiApp
            </Button>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavItem>
                <Button component={Link} to="/signup">
                  <HowToRegOutlinedIcon /> REGISTRUJ SE
                </Button>
              </NavItem>
            </Nav>
            <Nav>
              <NavItem>
                <Button component={Link} to="/login">
                  <VpnKeyOutlinedIcon style={styles.ikonica} /> PRIJAVI SE
                </Button>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;

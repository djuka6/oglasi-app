import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
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
              <Nav.Link>
                <Button component={Link} to="/signup">
                  <HowToRegOutlinedIcon /> REGISTRUJ SE
                </Button>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2}>
                <Button component={Link} to="/login">
                  <VpnKeyOutlinedIcon style={styles.ikonica} /> PRIJAVI SE
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;

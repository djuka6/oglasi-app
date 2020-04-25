import React, { Component } from "react";
import GuestNavBar from "./NavBar";
import AuthNavBar from "./NavBarLoggedIn";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class NavigationBar extends Component {
  render() {
    const userLinks = <AuthNavBar />;
    const guestLinks = <GuestNavBar />;
    if (this.props.authenticated) return userLinks;
    else return guestLinks;
  }
}

NavigationBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStatetoProps = (state) => ({
  authenticated: state.authenticated.authenticated,
});

export default connect(mapStatetoProps, null)(NavigationBar);

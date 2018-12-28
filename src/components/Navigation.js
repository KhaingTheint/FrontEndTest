import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavLink to="/">
          <label style={{ paddingLeft: 5, fontSize: 40 }}>&#x2630;</label>
        </NavLink>
        <NavLink to="/watchlist">
          <label style={{ fontSize: 60 }}>&#9734;</label>
        </NavLink>
      </div>
    );
  }
}

export default Navigation;

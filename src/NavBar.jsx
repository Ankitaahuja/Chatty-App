import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chit-Chat
        </a>
        <h4 className="user-count">{this.props.userCount} users online!</h4>
      </nav>
    );
  }
}
export default NavBar;

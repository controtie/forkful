import React, { Component } from 'react';
import { Link } from 'react-router';
import '../scss/_nav.scss';

class Nav extends Component {
  render() {
    return (
      <div>
        <h2>Navigation</h2>
        <div className="nav-bar">
          <input placeholder="Search for recipes"></input>
          <a href="#signin">Sign in</a>
          <a href="#signout">Sign out</a>
          <Link to="/">Index</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/recipe">Recipe</Link>
          <Link to="/search">Search</Link>
          <Link to="/create">Create</Link>
        </div>
      </div>
    );
  }
}

export default Nav;

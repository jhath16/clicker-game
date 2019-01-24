import React, { Component } from 'react';
import coins from './../assets/two-coins.svg';

import './nav.css';

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="container">
          <span className="nav__icon-group">
            <img className="nav__icon" src={coins} />
            <span className="nav__text">{this.props.total}</span>
          </span>
        </div>
      </div>
    );
  }
}

export default Nav;

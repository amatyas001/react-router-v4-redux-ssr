/*
  Home.js

  Child route of <Base> located at `/`
*/

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './view-styles/Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Ok to use `<Link>` here now, since the parent component (`<Base>`)
    // contains all router logic
    return (
      <div className="home-view">
        <h1>Home</h1>
        <br />
        <div>
          <b>Static</b>
          <br />
          <br />
          <Link to="/static">Static Page Example</Link>
          <Link to="/plusDataDeps">Static Route + External Data Example</Link>
          <Link to="/plusImage">Static Route + Image Example</Link>
          <br />
          <b>Static + Query Params</b>
          <ul>
            <li><Link to="/dataDepsParams?page=1">Static Route + External Data + Query Params PAGE 1 Example</Link></li>
            <li><Link to="/dataDepsParams?page=2">Static Route + External Data + Query Params PAGE 2 Example</Link></li>
            <li><Link to="/dataDepsParams?page=3">Static Route + External Data + Query Params PAGE 3 Example</Link></li>
          </ul>
          <br />
          <b>Dynamic</b>
          <br />
          <br />
          <Link to="/dynamic/1">Dynamic Page (Populated with <span>/1</span>)</Link>
          <Link to="/dynamic/2">Dynamic Page (Populated with <span>/2</span>)</Link>
          <Link to="/dynamic/3">Dynamic Page (Populated with <span>/3</span>)</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(Home));

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BaseRoutes from '../routing/BaseRoutes.js';

import './container-styles/Base.css';

class Base extends React.Component {
  constructor(props) {
    super(props);

    this.renderCount = 0;
  }

  render() {
    this.renderCount++;
    console.log('RENDERS:', this.renderCount)

    return (
      <div className="app-base">
        <h1>Base</h1>
        <BaseRoutes location={this.props.location} />
      </div>
    );
  }
}

export default withRouter(connect()(Base));

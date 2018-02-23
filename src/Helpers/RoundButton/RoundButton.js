import React, { Component } from 'react';

import classes from './roundButton.css';

export default class ModuleButton extends Component {
  render() {
    return (
      <button
        title={this.props.title}
        className={classes.roundButton}
        disabled={this.props.disabled}
        onClick={this.props.clickHandler}
      >
        <md-icon class="material-icons">{this.props.action}</md-icon>
      </button>
    );
  }
}

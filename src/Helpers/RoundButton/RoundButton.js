import React, { Component } from 'react';

import classes from './roundButton.css';

export default class ModuleButton extends Component {
  render() {
    return (
      <button
        type="button"
        className={classes.roundBtn}
        title={this.props.title}
        disabled={this.props.disabled}
        onClick={this.props.clickHandler}
      >
        <md-icon class="material-icons">{this.props.content}</md-icon>
      </button>
    );
  }
}

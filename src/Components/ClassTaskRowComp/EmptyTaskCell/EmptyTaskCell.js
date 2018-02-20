import React, { Component } from 'react';

import classes from './emptyTaskCell.css';
export default class EmptyTaskCell extends Component {
  render() {
    const { width, height } = this.props;
    console.log(width);
    return (
      <div
        className={classes.container}
        style={{ width: width + 'px', height: height + 'px' }}
      />
    );
  }
}

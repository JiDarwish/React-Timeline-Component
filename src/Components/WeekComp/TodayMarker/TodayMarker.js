import React, { Component } from 'react';

import classes from './todayMarker.css';

export default class TodayMarker extends Component {
  componentDidMount = () => {
    this.refs.today.parentNode.scrollIntoView();
  };

  render() {
    const { offset } = this.props;
    return (
      <div
        ref="today"
        style={{ left: offset + 'px' }}
        className={classes.todayMarker}
      />
    );
  }
}

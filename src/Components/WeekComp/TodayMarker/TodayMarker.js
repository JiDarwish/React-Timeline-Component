import React, { Component } from 'react';

import classes from './todayMarker.css';

export default class TodayMarker extends Component {
  componentDidMount = () => {
    const { todayMarker } = this.refs;
    this.props.setTodayMarkerRef(todayMarker);
    todayMarker.parentNode.scrollIntoView();
    // let leftPos = todayMarker.parentNode.getBoundingClientRect().x;
    // leftPos -= window.innerWidth / 2;
    // console.log('this one', leftPos);
    // let scrollEl = todayMarker.parentNode.parentNode.parentNode;
    // scrollEl.scrollLeft = leftPos;
    // window.scrollTo(leftPos, 0);
  };

  render() {
    const { offset } = this.props;
    return (
      <div
        ref="todayMarker"
        style={{ left: offset + 'px' }}
        className={classes.todayMarker}
      />
    );
  }
}

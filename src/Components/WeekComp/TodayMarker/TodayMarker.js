import React, { Component } from 'react';

import classes from './todayMarker.css';
import { timelineStore, TODAY_MARKER_REFERENCE } from '../../../Store';

export default class TodayMarker extends Component {
  componentDidMount = () => {
    const { todayMarker } = this.refs;
    // todayMarker.parentNode.scrollIntoView();
    let leftPos = todayMarker.parentNode.getBoundingClientRect().x;
    leftPos -= (window.innerWidth / 2);
    let scrollEl = document.querySelector('.timeline__root__2BlbQ');
    scrollEl.scrollLeft = leftPos;

    window.scrollTo(leftPos,0);
    timelineStore.setState({
      type: TODAY_MARKER_REFERENCE,
      payload: {
        todayMarkerRef: todayMarker
      }
    });
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

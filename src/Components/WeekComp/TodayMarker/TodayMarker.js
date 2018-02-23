import React, { Component } from 'react';

import classes from './todayMarker.css';
import { timelineStore, TODAY_MARKER_REFERENCE } from '../../../Store';

export default class TodayMarker extends Component {
  componentDidMount = () => {
    const { todayMarker } = this.refs;
    todayMarker.parentNode.scrollIntoView();
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

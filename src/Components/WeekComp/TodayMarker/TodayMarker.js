import React, { Component } from 'react';

import { timelineStore, TODAY_MARKER_REFERENCE } from '../../../Store';
import classes from './todayMarker.css';

export default class TodayMarker extends Component {
  componentDidMount = () => {
    timelineStore.setState({
      type: TODAY_MARKER_REFERENCE,
      payload: {
        todayMarkerRef: this.refs.today
      }
    });
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

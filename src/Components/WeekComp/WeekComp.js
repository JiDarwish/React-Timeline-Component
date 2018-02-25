import React, { Component } from 'react';

import classes from './weekComp.css';
import TodayMarker from './TodayMarker/TodayMarker';
import { getCurrentWeek } from '../../util';

export default class WeekComp extends Component {
  setTodayMarker = () => {
    const offset = getCurrentWeek(this.props.week, this.props.itemWidth);
    if (offset !== 0) return null;
    return <TodayMarker offset={offset} />;
  };
  render() {
    let [sunday1, sunday2] = this.props.week;
    let month;
    if (sunday1.format('MMM') === sunday2.format('MMM')) {
      month = sunday1.format('MMM');
    } else {
      month = `${sunday1.format('MMM')}/${sunday2.format('MMM')}`;
    }
    sunday1 = sunday1.format('DD');
    sunday2 = sunday2.format('DD');
    const { itemWidth, rowHeight } = this.props;
    const halfHeight = rowHeight / 2 + 'px';

    const todayMarkerComp = this.setTodayMarker(itemWidth);
    return (
      <div
        className={classes.weekCompContainer}
        style={{ width: itemWidth + 'px' }}
      >
        {todayMarkerComp}
        <span
          className={classes.monthContainer}
          style={{ height: halfHeight, lineHeight: halfHeight }}
        >
          {month}
        </span>
        <span style={{ height: halfHeight }} className={classes.daysContainer}>
          <span>{sunday1}</span>
          <span>{sunday2}</span>
        </span>
      </div>
    );
  }
}

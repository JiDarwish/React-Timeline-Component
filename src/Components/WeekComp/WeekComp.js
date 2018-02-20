import React, { Component } from 'react';

import classes from './weekComp.css';

export default class WeekComp extends Component {
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
    const { itemWidth } = this.props;
    return (
      <div
        className={classes.weekCompContainer}
        stlye={{ width: itemWidth + 'px' }}
      >
        <span className={classes.monthContainer}>{month}</span>
        <span className={classes.daysContainer}>
          <span>{sunday1}</span>
          <span>{sunday2}</span>
        </span>
      </div>
    );
  }
}

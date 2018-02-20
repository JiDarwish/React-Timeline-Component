import React, { Component } from 'react';

import classes from './taskComp.css';

export default class TaskComp extends Component {
  render() {
    const {
      module_name,
      starting_date,
      ending_date,
      duration,
      height
    } = this.props;
    let { width } = this.props;
    if (duration > 1) {
      // add extra times width as much as needed but for the margin add all - 1 (for the first item it doesn't need any margin)
      width = width * duration + 16 * (duration - 1);
    }

    return (
      <div
        className={classes.container}
        style={{ width: width + 'px', height: height + 'px' }}
      >
        <div className={classes.flexWrapper}>
          <span>{module_name}</span>
          <span className={classes.dates}>
            {starting_date.format('DD MMMM')} - {ending_date.format('DD MMMM')}
          </span>
        </div>
      </div>
    );
  }
}

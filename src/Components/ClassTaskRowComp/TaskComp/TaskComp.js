import React, { Component } from 'react';

import classes from './taskComp.css';

export default class TaskComp extends Component {
  handleClick = e => {
    let item = this.props.item;
    this.props.clickHandler(e, item); // will call the provided click event to furthur change the state of the selected module
  };

  render() {
    const {
      module_name,
      starting_date,
      ending_date,
      duration,
      color,
      git_url
    } = this.props.item;

    let { width, height, active } = this.props;
    if (duration > 1) {
      // add extra times width as much as needed but for the margin add all - 1 (for the first item it doesn't need any margin)
      width = width * duration + 16 * (duration - 1);
    }
    let className = classes.flexWrapper;
    if (active) className += ` ${classes.active}`;

    return (
      <div
        className={classes.container}
        style={{ width: width + 'px', height: height + 'px' }}
      >
        <div
          className={className}
          style={{ backgroundColor: color }}
          title={module_name}
          data-url={git_url}
          data-module_name={module_name}
          data-starting_date={starting_date}
          data-ending_date={ending_date}
          data-duration={duration}
          onClick={this.handleClick}
        >
          <span>{module_name}</span>
          <span className={classes.dates}>
            {starting_date.format('DD MMMM')} - {ending_date.format('DD MMMM')}
          </span>
        </div>
      </div>
    );
  }
}

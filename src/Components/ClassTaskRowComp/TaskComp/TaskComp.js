import React, { Component } from 'react';

import classes from './taskComp.css';
import { timelineStore, SELECTED_MODULE_ID_CHANGED } from '../../../Store';

export default class TaskComp extends Component {
  handleClick = e => {
    let item = this.props.item;
    const selectedItemInStore = timelineStore.getState().selectedModule;
    if (selectedItemInStore) {
      // if the clicked module is the same on unselect it
      if (item.running_module_id === selectedItemInStore.running_module_id) {
        item = null;
      }
    }
    timelineStore.setState({
      type: SELECTED_MODULE_ID_CHANGED,
      payload: {
        selectedModule: item
      }
    });
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
          dataset={[git_url]}
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

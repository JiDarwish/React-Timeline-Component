import React, { Component } from 'react';

import DropdownList from '../DropdownList/DropdownList';
import classes from './taskComp.css';
import AssignTeacherModal from '../DropdownList/AssignTeacherModal/AssignTeacherModal';
import { timelineStore } from '../../../Store';

export default class TaskComp extends Component {
  state = {
    assignTeacherModalIsToggled: false,
    dontChangeSelectedItem: false
  };

  showAssignTeacherModal = e => {
    e.stopPropagation();
    this.setState({ assignTeacherModalIsToggled: true });
  };

  hideAssignTeacherModal = () => {
    this.setState({ assignTeacherModalIsToggled: false });
  };

  handleHoverItem = e => {
    if (!this.state.dontChangeSelectedItem) {
      console.log('hover');
      let item = this.props.item;
      this.props.hoverHandler(e, item); // will call the provided hover event to furthur change the state of the selected module
      this.setState({ dontChangeSelectedItem: true });
    }
  };

  handleNotSelected = e => {
    this.props.hoverHandler(e, null); // when the mouse leaves we remove stop showing options
    this.setState({ dontChangeSelectedItem: false });
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

    let dropdownList = null;
    if (
      this.props.selectedModule &&
      this.props.selectedModule.running_module_id ===
        this.props.item.running_module_id
    ) {
      dropdownList = (
        <div className={classes.dropdownListContainer}>
          <DropdownList
            showModal={this.showAssignTeacherModal}
            selectedModule={this.props.selectedModule}
            allModules={this.props.allModules}
          />
        </div>
      );
    }
    const theStart = starting_date.clone();
    theStart.add(2, 'hours');
    // ending_date.subtract(1, )

    return (
      <div>
        <AssignTeacherModal
          visible={this.state.assignTeacherModalIsToggled}
          selectedModule={this.props.selectedModule}
          assignTeachersFunc={timelineStore.handleAssignTeachers}
          closeModal={this.hideAssignTeacherModal}
        />
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
            onMouseOver={this.handleHoverItem}
            onMouseLeave={this.handleNotSelected}
          >
            <span>{module_name}</span>
            <span className={classes.dates}>
              {theStart.format('DD MMMM')} - {ending_date.format('DD MMMM')}
            </span>
            {dropdownList}
          </div>
        </div>
      </div>
    );
  }
}

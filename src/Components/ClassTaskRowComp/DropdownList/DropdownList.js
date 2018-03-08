import React, { Component } from 'react';

import classes from './dropdownList.css';
import Dropdown from '../../../Helpers/Dropdown/Dropdown';
import RoundButton from '../../../Helpers/RoundButton/RoundButton';
import ballpointPen from './icons/ballpointPen.svg';
import rightArrow1 from './icons/rightArrow1.svg';
import rightArrow2 from './icons/rightArrow2.svg';
import leftArrow1 from './icons/leftArrow1.svg';
import leftArrow2 from './icons/leftArrow2.svg';
import graduateCap from './icons/graduateCap.svg';

import { timelineStore } from '../../../Store';

export default class DropdownList extends Component {
  state = {
    isToggled: false
  };

  toggleDropdown = e => {
    e.stopPropagation();
    this.setState({ isToggled: !this.state.isToggled });
  };

  weekLonger = e => {
    e.stopPropagation();
    const { selectedModule } = this.props;
    timelineStore.updateModule(selectedModule, 'weekLonger');
  };

  weekShorter = e => {
    e.stopPropagation();
    const { selectedModule } = this.props;
    timelineStore.updateModule(selectedModule, 'weekShorter');
  };

  moveLeft = e => {
    e.stopPropagation();

    const { selectedModule } = this.props;
    timelineStore.updateModule(selectedModule, 'moveLeft');
  };

  moveRight = e => {
    e.stopPropagation();

    const { selectedModule } = this.props;
    timelineStore.updateModule(selectedModule, 'moveRight');
  };

  assignTeachers = e => {
    e.stopPropagation();
    // display the modal within which a user gets to assign teachers to a module and give it the
    timelineStore.handleAssignTeachers(this.props.selectedModule);
  };

  checkModuleIsLast = () => {
    const { position, group_name } = this.props.selectedModule;
    console.log(this.props.allModules);
    const classModules = this.props.allModules.filter(
      module => module.group_name === group_name
    );
    const itemsAfter = classModules.filter(item => item.position > position);
    return itemsAfter.length === 0;
  };

  render() {
    let moveLeft = this.moveLeft;
    let moveRight = this.moveRight;
    let rightDisableClass = null;
    let leftDisableClass = null;
    if (this.props.selectedModule.position === 0) {
      moveLeft = null;
      leftDisableClass = classes.disabled;
    }

    if (this.checkModuleIsLast()) {
      moveRight = null;
      rightDisableClass = classes.disabled;
    }
    return (
      <div>
        <RoundButton
          clickHandler={this.toggleDropdown}
          action="..."
          title="more info"
          className={classes.dropdownToggeler}
        />
        <Dropdown isToggled={this.state.isToggled} className={classes.dropdown}>
          <ul>
            <li>
              <span
                className={classes.listItem + ' ' + rightDisableClass}
                onClick={moveRight}
              >
                <span className={classes.symbol}>
                  <img src={rightArrow1} width="30px" alt="rightArrow1 icon" />
                </span>
                <span>Move right</span>
              </span>
            </li>
            <li>
              <span
                className={classes.listItem + ' ' + leftDisableClass}
                onClick={moveLeft}
              >
                <span className={classes.symbol}>
                  <img src={leftArrow1} width="30px" alt="leftArrow1 icon" />
                </span>
                <span>Move left</span>
              </span>
            </li>
            <li>
              <span className={classes.listItem} onClick={this.weekLonger}>
                <span className={classes.symbol}>
                  <img src={rightArrow2} width="30px" alt="rightArrow2 icon" />
                </span>
                <span>Week longer</span>
              </span>
            </li>
            <li>
              <span className={classes.listItem} onClick={this.weekShorter}>
                <span className={classes.symbol}>
                  <img src={leftArrow2} width="30px" alt="leftArrow2 icon" />
                </span>
                <span>Week shorter</span>
              </span>
            </li>
            <li>
              <span className={classes.listItem} onClick={this.assignTeachers}>
                <span className={classes.symbol}>
                  <img src={graduateCap} width="30px" alt="graduateCap icon" />
                </span>
                <span>Assign teachers</span>
              </span>
            </li>
            <li>
              <span
                className={classes.listItem}
                onClick={e => e.stopPropagation()}
              >
                <span className={classes.symbol}>
                  <img
                    src={ballpointPen}
                    width="30px"
                    alt="ballpointPen icon"
                  />
                </span>
                <span>More options</span>
              </span>
            </li>
          </ul>
        </Dropdown>
      </div>
    );
  }
}

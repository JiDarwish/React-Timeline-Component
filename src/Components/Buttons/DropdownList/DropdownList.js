import React, { Component } from 'react';

import classes from './dropdownList.css';
import Dropdown from '../../../Helpers/Dropdown/Dropdown';
import RoundButton from '../../../Helpers/RoundButton/RoundButton';
import { timelineStore } from '../../../Store';

export default class DropdownList extends Component {
  state = {
    isToggled: false
  };

  toggleDropdown = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };

  weekLonger = () => {
    const { selectedModule, originalData } = this.props;
    timelineStore.updateModule(selectedModule, originalData, 'weekLonger');
  };

  weekShorter = () => {
    const { selectedModule, originalData } = this.props;
    timelineStore.updateModule(selectedModule, originalData, 'weekShorter');
  };

  moveLeft = () => {
    const { selectedModule, originalData } = this.props;
    timelineStore.updateModule(selectedModule, originalData, 'moveLeft');
  };

  moveRight = () => {
    const { selectedModule, originalData } = this.props;
    timelineStore.updateModule(selectedModule, originalData, 'moveRight');
  };

  checkModuleIsLast: Boolean = () => {
    const { position, group_name } = this.props.selectedModule;
    const itemsAfter = this.props.originalData[group_name].filter(
      item => item.position > position
    );
    return itemsAfter.length === 0;
  };

  render() {
    console.log(this.props);
    let moveLeft = this.moveLeft;
    let moveRight = this.moveRight;
    let rightDisableClass = null;
    let leftDisableClass = null;
    console.log(this.props.selectedModule.position);
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
        />
        <Dropdown isToggled={this.state.isToggled} className={classes.dropdown}>
          <ul>
            <li>
              <span
                className={classes.listItem + ' ' + rightDisableClass}
                onClick={moveRight}
              >
                <span className={classes.symbol}>►</span>
                <span>Move right</span>
              </span>
            </li>
            <li>
              <span
                className={classes.listItem + ' ' + leftDisableClass}
                onClick={moveLeft}
              >
                <span className={classes.symbol}>◄</span>
                <span>Move left</span>
              </span>
            </li>
            <li>
              <span className={classes.listItem} onClick={this.weekLonger}>
                <span className={classes.symbol}>⏭</span>
                <span>Week longer</span>
              </span>
            </li>
            <li>
              <span className={classes.listItem} onClick={this.weekShorter}>
                <span className={classes.symbol}>⏮</span>
                <span>Week shorter</span>
              </span>
            </li>
            <li>
              <span className={classes.listItem}>
                <span
                  className={classes.symbol}
                  role="img"
                  aria-label="Graduation-cap"
                >
                  🎓
                </span>
                <span>Assign teachers</span>
              </span>
            </li>
            <li>
              <span className={classes.listItem}>
                <span className={classes.symbol}>🖊</span>
                <span>More options</span>
              </span>
            </li>
          </ul>
        </Dropdown>
      </div>
    );
  }
}

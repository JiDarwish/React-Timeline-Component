import React, { Component, Fragment } from 'react';

import RoundButton from '../../Helpers/RoundButton/RoundButton';
import Dropdown from '../../Helpers/Dropdown/Dropdown';
import DropdownList from './DropdownList/DropdownList';
import classes from './buttons.css';

export default class Button extends Component {
  render() {
    let addGroupBtn = null;
    let dropdownList = null;
    const { isTeacher, selectedModule, originalData } = this.props;
    if (isTeacher) {
      if (selectedModule) {
        dropdownList = (
          <DropdownList
            selectedModule={selectedModule}
            originalData={originalData}
          />
        );
      }
      addGroupBtn = (
        <Fragment>
          <RoundButton
            clickHandler={() => console.log('implemented when integrating')}
            action="+"
            title="Add a class"
          />
          <div className={classes.containerBtnAndDropdown} />
        </Fragment>
      );
    }
    return (
      <div className={classes.buttonsWrapper}>
        {dropdownList}
        {addGroupBtn}
        <RoundButton
          clickHandler={this.props.clickHandler}
          action=">"
          title="Go to today"
        />
      </div>
    );
  }
}

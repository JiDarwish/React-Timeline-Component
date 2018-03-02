import React, { Component, Fragment } from 'react';

import RoundButton from '../../Helpers/RoundButton/RoundButton';
import classes from './buttons.css';

export default class Button extends Component {
  render() {
    let addGroupBtn = null;
    const { isTeacher } = this.props;
    if (isTeacher) {
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

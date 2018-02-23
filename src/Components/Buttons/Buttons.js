import React, { Component, Fragment } from 'react';

import RoundButton from '../../Helpers/RoundButton/RoundButton';
import classes from './buttons.css';

export default class Button extends Component {
  render() {
    let teacherBtns = null;
    if (this.props.isTeacher) {
      teacherBtns = (
        <Fragment>
          <RoundButton
            clickHandler={() => console.log('implemented when integrating')}
            action="+"
            title="Add a class"
          />
          <RoundButton
            clickHandler={() => console.log('implementing when integrating')}
            action="..."
            title="more info"
          />
        </Fragment>
      );
    }
    return (
      <div className={classes.buttonsWrapper}>
        {teacherBtns}
        <RoundButton
          clickHandler={this.props.clickHandler}
          action=">"
          title="Go to today"
        />
      </div>
    );
  }
}

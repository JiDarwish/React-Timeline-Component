import React, { Component } from 'react';

import ClassRowComp from './ClassRowComp/ClassRowComp';
import classes from './classBarRowComp.css';

export default class ClassBarRowComp extends Component {
  renderAllRowComp = () => {
    if (!this.props.groups) return;
    return this.props.groups.map(group => (
      <ClassRowComp classId={group.split(' ')[1]} />
    ));
  };
  render() {
    return <div className={classes.container}>{this.renderAllRowComp()}</div>;
  }
}

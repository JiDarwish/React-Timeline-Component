import React, { Component } from 'react';

import ClassRowComp from './ClassRowComp/ClassRowComp';
import classes from './classBarRowComp.css';

export default class ClassBarRowComp extends Component {
  renderAllRowComp = () => {
    if (!this.props.groups) return;
    return this.props.groups.map(group => (
      <ClassRowComp
        key={group}
        classId={group.split(' ')[1]}
        height={this.props.rowHeight}
      />
    ));
  };
  render() {
    // displaying one extra component to fill in the empty place in the top-left corner
    return (
      <div className={classes.container + ' fixMeToLeft'}>
        <ClassRowComp height={this.props.rowHeight} />
        {this.renderAllRowComp()}
      </div>
    );
  }
}

import React, { Component } from 'react';

import ClassRowComp from './ClassRowComp/ClassRowComp';
import classes from './classBarRowComp.css';
import { timelineStore, GROUPS_COLUMN_REFERENCE } from '../../Store';

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

  componentDidMount = () => {
    // needed by parent's scroll event to make it stick to the left of the screen
    timelineStore.setState({
      type: GROUPS_COLUMN_REFERENCE,
      payload: {
        groupsColumnRef: this.refs.groupsRowContainer
      }
    });
  };

  render() {
    // displaying one extra component to fill in the empty place in the top-left corner
    return (
      <div ref="groupsRowContainer" className={classes.container}>
        <ClassRowComp height={this.props.rowHeight} />
        {this.renderAllRowComp()}
      </div>
    );
  }
}

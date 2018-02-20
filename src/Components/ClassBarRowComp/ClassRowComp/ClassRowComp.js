import React, { Component } from 'react';

export default class ClassRowComp extends Component {
  render() {
    const { classId } = this.props;
    return (
      <div>
        <div>
          <span>{classId}</span>
        </div>
      </div>
    );
  }
}

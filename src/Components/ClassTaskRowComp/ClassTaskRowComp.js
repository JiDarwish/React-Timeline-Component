import React, { Component, Fragment } from 'react';

import { getWeeksBeforeAndAfter } from '../../util';
import TaskComp from './TaskComp/TaskComp';
import EmptyTaskCell from './EmptyTaskCell/EmptyTaskCell';

export default class ClassTaskRowComp extends Component {
  renderAllTaskComps = () => {
    const { width, height, allWeeks, items } = this.props;
    const { weeksBefore, weeksAfter } = getWeeksBeforeAndAfter(allWeeks, items);
    let rowCells = [];
    if (weeksBefore.length !== 0) {
      rowCells = weeksBefore.map(week => (
        <EmptyTaskCell key={week} width={width} height={height} />
      ));
    }

    const taskRowItems = items.map(item => {
      return (
        <TaskComp
          key={item.starting_date}
          {...item}
          width={width}
          height={height}
        />
      );
    });
    rowCells = [...rowCells, ...taskRowItems];
    if (weeksAfter.length === 0) return rowCells;

    const cellsAfter = weeksAfter.map(week => (
      <EmptyTaskCell key={week} width={width} height={height} />
    ));

    return [...rowCells, ...cellsAfter];
  };
  render() {
    return <Fragment>{this.renderAllTaskComps()}</Fragment>;
  }
}

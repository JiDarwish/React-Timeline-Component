import React, { Component, Fragment } from 'react';

import { getWeeksBeforeAndAfter } from '../../util';
import TaskComp from './TaskComp/TaskComp';
import EmptyTaskCell from './EmptyTaskCell/EmptyTaskCell';

export default class ClassTaskRowComp extends Component {
  renderAllTaskComps = () => {
    const { width, height, allWeeks, items, selectedModuleId } = this.props;
    console.log(this.props);
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
          active={item.running_module_id === selectedModuleId}
          key={item.starting_date}
          item={{ ...item }}
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

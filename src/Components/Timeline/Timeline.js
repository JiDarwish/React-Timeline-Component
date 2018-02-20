import React, { Component } from 'react';

import {
  timelineStore,
  TIMELINE_ITEMS_CHANGED,
  TIMELINE_GROUPS_CHANGED,
  ALL_WEEKS_CHANGED
} from '../../Store';

import WeekComp from '../WeekComp/WeekComp';
import ClassBarRowComp from '../ClassBarRowComp/ClassBarRowComp';
import classes from './timeline.css';
const weekLength = '200';
const rowHeight = '70';

export default class Timeline extends Component {
  state = {
    timelineItems: null,
    groups: null,
    allWeeks: null,
    totalWeeks: null
  };

  renderWeekComp = () => {
    if (!this.state.allWeeks) return null;
    return (
      <div className={classes.rowContainer}>
        {this.state.allWeeks.map(week => (
          <WeekComp
            key={week}
            week={week}
            rowHeight={rowHeight}
            itemWidth={weekLength}
          />
        ))}
      </div>
    );
  };

  observer = mergedData => {
    switch (mergedData.type) {
      case TIMELINE_ITEMS_CHANGED:
        this.setState({ timelineItems: mergedData.payload.items });
        break;
      case TIMELINE_GROUPS_CHANGED:
        this.setState({ groups: mergedData.payload.groups });
        break;
      case ALL_WEEKS_CHANGED:
        const { allWeeks } = mergedData.payload;
        this.setState({ allWeeks: allWeeks, totalWeeks: allWeeks.length });
        break;
      default:
        break;
    }
  };

  componentDidMount = () => {
    timelineStore.subscribe(this.observer);

    // kick in the process by getting the items and changing the state properties
    timelineStore.fetchItems();
  };

  componentWillUnmount = () => {
    timelineStore.unsubscribe(this.observer);
  };

  render() {
    const { allWeeks } = this.state;
    // if there items are fetched  width is the 200 times total weeks otherwise it's 100vh
    const width = allWeeks ? weekLength * allWeeks.length + 'px' : '100vw';
    return (
      <div className={classes.root}>
        <div className={classes.timelineContainer} style={{ width: width }}>
          <ClassBarRowComp groups={this.state.groups} rowHeight={rowHeight} />
          <div className={classes.rowsContainer}>{this.renderWeekComp()}</div>
        </div>
      </div>
    );
  }
}

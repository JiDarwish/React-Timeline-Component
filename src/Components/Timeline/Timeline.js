import React, { Component } from 'react';

import {
  timelineStore,
  TIMELINE_ITEMS_CHANGED,
  TIMELINE_GROUPS_CHANGED,
  ALL_WEEKS_CHANGED
} from '../../Store';

import WeekComp from '../WeekComp/WeekComp';
import ClassBarRowComp from '../ClassBarRowComp/ClassBarRowComp';
import ClassTaskRowComp from '../ClassTaskRowComp/ClassTaskRowComp';
import classes from './timeline.css';
const weekWidth = '125';
const rowHeight = '60';

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
            itemWidth={weekWidth}
          />
        ))}
      </div>
    );
  };

  renderTaskRowComp = () => {
    if (
      !this.state.groups ||
      !this.state.timelineItems ||
      !this.state.allWeeks
    ) {
      return null;
    }
    return this.state.groups.map(group => {
      const items = this.state.timelineItems[group];
      return (
        <div key={items[0].group_name} className={classes.rowContainer}>
          <ClassTaskRowComp
            items={items}
            width={weekWidth}
            height={rowHeight}
            allWeeks={this.state.allWeeks}
          />
        </div>
      );
    });
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

  fixListOfClassesToLeft = event => {
    const groupsColumn = document.getElementsByClassName('fixMeToLeft')[0];
    groupsColumn.style.top = 0 + 'px';
  };

  render() {
    const { allWeeks } = this.state;
    // if there items are fetched  width is the 200 times total weeks otherwise it's 100vh
    // FIXME: no idea why this is not working with just 16 instead of 21
    const width = allWeeks
      ? weekWidth * allWeeks.length + 21 * allWeeks.length + 'px'
      : '100vw';
    return (
      <div className={classes.root} onScroll={this.fixListOfClassesToLeft}>
        <div className={classes.timelineContainer} style={{ width: width }}>
          <ClassBarRowComp groups={this.state.groups} rowHeight={rowHeight} />
          <div className={classes.rowsContainer}>
            {this.renderWeekComp()}
            {this.renderTaskRowComp()}
          </div>
        </div>
      </div>
    );
  }
}

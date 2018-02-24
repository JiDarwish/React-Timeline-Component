import React, { Component } from 'react';

import {
  timelineStore,
  TIMELINE_ITEMS_CHANGED,
  TIMELINE_GROUPS_CHANGED,
  ALL_WEEKS_CHANGED,
  GROUPS_COLUMN_REFERENCE,
  TODAY_MARKER_REFERENCE,
  SELECTED_MODULE_ID_CHANGED,
  ORIGINAL_DATA_CHANGED
} from '../../Store';

import WeekComp from '../WeekComp/WeekComp';
import ClassBarRowComp from '../ClassBarRowComp/ClassBarRowComp';
import ClassTaskRowComp from '../ClassTaskRowComp/ClassTaskRowComp';
import Buttons from '../Buttons/Buttons';
import classes from './timeline.css';
const weekWidth = '125';
const rowHeight = '60';

export default class Timeline extends Component {
  state = {
    originalData: null,
    timelineItems: null,
    groups: null,
    allWeeks: null,
    totalWeeks: null,
    groupsColumnRef: null,
    todayMarkerRef: null,
    selectedModule: null
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
            selectedModule={this.state.selectedModule}
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
      case TODAY_MARKER_REFERENCE:
        this.setState({ todayMarkerRef: mergedData.payload.todayMarkerRef });
        break;
      case ORIGINAL_DATA_CHANGED:
        this.setState({ originalData: mergedData.payload.originalData });
        break;
      case TIMELINE_GROUPS_CHANGED:
        this.setState({ groups: mergedData.payload.groups });
        break;
      case GROUPS_COLUMN_REFERENCE:
        this.setState({ groupsColumnRef: mergedData.payload.groupsColumnRef });
        break;
      case SELECTED_MODULE_ID_CHANGED:
        this.setState({
          selectedModule: mergedData.payload.selectedModule
        });
        break;
      case ALL_WEEKS_CHANGED:
        const { allWeeks } = mergedData.payload;
        this.setState({ allWeeks: allWeeks, totalWeeks: allWeeks.length });
        break;
      default:
        break;
    }
  };

  handleScroll = e => {
    const { groupsColumnRef } = this.state;
    const { scrollLeft, clientWidth } = e.target;
    // I am setting this.state.... = but this is just a reference to an element
    // scroll the groups row along
    groupsColumnRef.style.left = scrollLeft + 'px';

    //scroll the buttons along
    this.refs.buttonsContainer.style.left =
      scrollLeft + clientWidth - 70 + 'px';
  };

  handleClickTodayMarker = e => {
    console.log('clickHandler');
    this.state.todayMarkerRef.scrollIntoView({ behavior: 'smooth' });
  };

  componentWillMount = () => {
    // so that it gets all setState notification from generated by componentDidMount of children elements
    timelineStore.subscribe(this.observer);
  };

  componentDidMount = () => {
    // kick in the process by getting the items and changing the state properties
    // in didMount cause it causes side-effects
    timelineStore.fetchItems();
  };

  componentWillUnmount = () => {
    timelineStore.unsubscribe(this.observer);
  };

  render() {
    const { allWeeks } = this.state;
    // if there items are fetched  width is the 200 times total weeks otherwise it's 100vh
    // FIXME: no idea why this is not working with just 16 instead of 21
    const width = allWeeks
      ? weekWidth * allWeeks.length + 21 * allWeeks.length + 'px'
      : '100vw';
    return (
      <div className={classes.root} onScroll={this.handleScroll}>
        <div className={classes.timelineContainer} style={{ width: width }}>
          <div ref="buttonsContainer" className={classes.buttonsContainer}>
            <Buttons
              originalData={this.state.originalData}
              clickHandler={this.handleClickTodayMarker}
              isTeacher={true}
              selectedModule={this.state.selectedModule}
            />
          </div>
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

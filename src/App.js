import React, { Component } from 'react';
import Timeline from './Components/Timeline/Timeline';
import './app.css';
import {
  timelineStore,
  TIMELINE_ITEMS_CHANGED,
  TIMELINE_GROUPS_CHANGED,
  ALL_WEEKS_CHANGED,
  TODAY_MARKER_REFERENCE,
  SELECTED_MODULE_ID_CHANGED,
  ORIGINAL_DATA_CHANGED
} from './Store';

import Dropdown from './Helpers/Dropdown/Dropdown.js';

class App extends Component {
  state = {
    originalData: null,
    timelineItems: null,
    groups: null,
    allWeeks: null,
    todayMarkerRef: null,
    selectedModule: null
  };

  itemClickHandler(clickEvent, item) {
    const selectedItemInStore = timelineStore.getState().selectedModule;
    if (
      selectedItemInStore &&
      item.running_module_id === selectedItemInStore.running_module_id
    ) {
      // if the clicked module is the same on unselect it
      item = null;
    }
    timelineStore.setState({
      type: SELECTED_MODULE_ID_CHANGED,
      payload: {
        selectedModule: item
      }
    });
  }

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
      case SELECTED_MODULE_ID_CHANGED:
        this.setState({
          selectedModule: mergedData.payload.selectedModule
        });
        break;
      case ALL_WEEKS_CHANGED:
        const { allWeeks } = mergedData.payload;
        this.setState({ allWeeks: allWeeks });
        break;
      default:
        break;
    }
  };

  componentWillMount() {
    timelineStore.subscribe(this.observer);
  }

  componentWillUnmount() {
    timelineStore.unsubscribe(this.observer);
  }

  render() {
    return (
      <div className="App">
        <Timeline
          itemWidth={125}
          rowHeight={60}
          originalData={this.state.originalData}
          timelineItems={this.state.timelineItems}
          groups={this.state.groups}
          allWeeks={this.state.allWeeks}
          totalWeeks={this.state.totalWeeks}
          selectedModule={this.state.selectedModule}
          itemClickHandler={this.itemClickHandler}
        />
        <Dropdown isMenuShow={true}>
          <li>
            <button>I am a damn button</button>
          </li>
          <li>sdhfusefw</li>
          <li>sdhfusefw</li>
        </Dropdown>
      </div>
    );
  }
}

export default App;

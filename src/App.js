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
  ALL_POSSIBLE_MODULES_CHANGED,
  GROUPS_WITH_IDS_CHANGED
} from './Store';

class App extends Component {
  state = {
    timelineItems: null,
    groups: null,
    allWeeks: null,
    todayMarkerRef: null,
    selectedModule: null,
    modules: null,
    groupsWithIds: null
  };

  itemClickHandler(clickEvent, item) {
    const selectedItemInStore = timelineStore.getState().selectedModule;
    if (
      !item ||
      (selectedItemInStore &&
        item.running_module_id === selectedItemInStore.running_module_id)
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
      case GROUPS_WITH_IDS_CHANGED:
        this.setState({ groupsWithIds: mergedData.payload.groupsWithIds });
        break;
      case TODAY_MARKER_REFERENCE:
        this.setState({ todayMarkerRef: mergedData.payload.todayMarkerRef });
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
      case ALL_POSSIBLE_MODULES_CHANGED:
        const { modules } = mergedData.payload;
        this.setState({ modules });
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
          itemWidth={170}
          rowHeight={70}
          isTeacher={true}
          timelineItems={this.state.timelineItems}
          groups={this.state.groups}
          allWeeks={this.state.allWeeks}
          totalWeeks={this.state.totalWeeks}
          selectedModule={this.state.selectedModule}
          itemClickHandler={this.itemClickHandler}
          allModules={this.state.modules}
          groupsWithIds={this.state.groupsWithIds}
        />
      </div>
    );
  }
}

export default App;

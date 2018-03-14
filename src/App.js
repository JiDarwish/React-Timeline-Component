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
  GROUPS_WITH_IDS_CHANGED,
  ALL_TEACHERS_CHAGNED,
  INFO_SELECTED_MDOULE_CHANGED
} from './Store';

class App extends Component {
  state = {
    timelineItems: null,
    groups: null,
    allWeeks: null,
    todayMarkerRef: null,
    selectedModule: null,
    modules: null,
    groupsWithIds: null,
    teachers: null,
    infoSelectedModule: null
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
    } else {
      console.log('getting selectedmoduleinfo');
      timelineStore.getSelectedModuleInfo(item);
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
      case ALL_TEACHERS_CHAGNED:
        this.setState({ teachers: mergedData.payload.teachers });
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
        console.log('here selecting something');
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
      case INFO_SELECTED_MDOULE_CHANGED:
        this.setState({
          infoSelectedModule: mergedData.payload.allModulesOfGroup
        });
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
          teachers={this.state.teachers}
          infoSelectedModule={this.state.infoSelectedModule}
        />
      </div>
    );
  }
}

export default App;

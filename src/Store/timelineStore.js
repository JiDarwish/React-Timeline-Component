import {
  TIMELINE_GROUPS_CHANGED,
  TIMELINE_ITEMS_CHANGED,
  ALL_WEEKS_CHANGED,
  ALL_POSSIBLE_MODULES_CHANGED,
  ALL_SUNDAYS_CHANGED,
  GROUPS_WITH_IDS_CHANGED
} from './';

import {
  getAllTotalWeeksAndSundays,
  getTimelineItems,
  setEndingDateForModules,
  weekLonger,
  weekShorter,
  moveLeft,
  moveRight,
  assignTeachers,
  addNewClass,
  getALlPossibleModules,
  addNewModuleToClass,
  getAllGroupsWithIds
} from '../util';

const BASE_URL = 'http://localhost:3005';

export default function() {
  let _observers = [];
  let _data = {};

  const subscribe = observer => {
    _observers.push(observer);
  };

  const unsubscribe = observer => {
    _observers = _observers.filter(item => item !== observer);
  };

  const isSubscribed = observer => {
    return _observers.includes(observer);
  };

  const setState = merge => {
    let old = {};
    for (let changedItemKey in merge.payload) {
      if (_data.hasOwnProperty(changedItemKey)) {
        old[changedItemKey] = merge.payload[changedItemKey];
      }
      _data[changedItemKey] = merge.payload[changedItemKey];
    }

    _observers.forEach(observer => observer(merge, old));
  };

  const getState = () => {
    return _data;
  };

  const fetchItems = async () => {
    const timelineItems = await getTimelineItems(
      BASE_URL + '/api/timeline'
    ).catch(err => console.log(err));

    // set the state with the array of all current groups [maybe needed for sidecolumn group names]
    const groups = Object.keys(timelineItems);
    setState({
      type: TIMELINE_GROUPS_CHANGED,
      payload: {
        // TODO:
        groups
      }
    });

    const groupsWithIds = await getAllGroupsWithIds();

    setState({
      type: GROUPS_WITH_IDS_CHANGED,
      payload: {
        groupsWithIds
      }
    });

    const withEndingDate = setEndingDateForModules(timelineItems, groups); // group names
    // set the state with the new received items
    setState({
      type: TIMELINE_ITEMS_CHANGED,
      payload: {
        items: withEndingDate
      }
    });

    // get all possible modules for addition
    const allPossibleModules = await getALlPossibleModules().catch(err =>
      console.log(err)
    );
    setState({
      type: ALL_POSSIBLE_MODULES_CHANGED,
      payload: {
        modules: allPossibleModules
      }
    });

    // get all sundays and count how many weeks
    const { allWeeks, allSundays } = getAllTotalWeeksAndSundays(withEndingDate);

    //set State with all sundays
    setState({
      type: ALL_SUNDAYS_CHANGED,
      payload: {
        allSundays
      }
    });

    // Set state with all weeks moments
    setState({
      type: ALL_WEEKS_CHANGED,
      payload: {
        allWeeks
      }
    });

    // set state with total weeks during all known schedule for current classes
  };

  const updateModule = (module, action) => {
    let result = null;
    switch (action) {
      case 'weekLonger':
        result = weekLonger(module, getState().groups);
        break;
      case 'weekShorter':
        result = weekShorter(module, getState().groups);
        break;
      case 'moveLeft':
        result = moveLeft(module, getState().groups);
        break;
      case 'moveRight':
        result = moveRight(module, getState().groups);
        break;
      default:
        break;
    }

    result
      .then(() => {
        fetchItems();
      })
      .catch(err => console.log(err));
  };

  const handleAssignTeachers = (item, teacher1, teacher2) => {
    const groups = getState().groups;
    assignTeachers(item, groups, teacher1, teacher2)
      // when done go back throught the whole procedure to get the items on screen
      .then(() => {
        fetchItems();
        console.log('herer');
      });
  };

  const handleAddModule = async (
    selectedModule,
    selectedGroup,
    duration,
    selectedDate,
    items
  ) => {
    // make all the computations in util
    addNewModuleToClass(
      selectedModule,
      selectedGroup,
      duration,
      selectedDate,
      items
    ).then(res => {
      console.error('hahahaha', res);
    });
  };

  const addTheClass = (className, starting_date) => {
    return addNewClass(className, starting_date);
  };
  return {
    subscribe,
    unsubscribe,
    isSubscribed,
    getState,
    setState,
    fetchItems,
    updateModule,
    handleAddModule,
    addTheClass,
    handleAssignTeachers
  };
}

///////////////////////////////////////////////////////////////// Not used for now

// const handleToggleModal = () => {
//   const currentModalState = _data.isModalOpen || false;
//   setState({
//     type: MODAL_STATE_CHANGED,
//     payload: {
//       isModalOpen: !currentModalState
//     }
//   });
// };

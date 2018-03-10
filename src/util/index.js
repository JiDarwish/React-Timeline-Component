import moment from 'moment';
import fakeData from '../Data/fakeData.json';

const BASE_URL = 'http://localhost:3005';

//return a promise with `then` getting the json formatted data
export function getTimelineItems() {
  // return Promise.resolve(fakeData);
  return fetch(BASE_URL + '/api/timeline').then(res => res.json());
}

export function setEndingDateForModules(allItems, groups) {
  groups.forEach(group => {
    const items = allItems[group];
    items.sort((a, b) => a.position - b.position); // make sure it is sorted

    let lastDate = ''; // will be overwritten by each module of a group to set the ending date

    items.map(item => {
      if (lastDate === '') lastDate = item.starting_date;
      item.starting_date = moment(lastDate);

      item.ending_date = moment(lastDate).add(item.duration, 'weeks');
      lastDate = moment(item.ending_date);
      return item;
    });
  });
  return allItems;
}

export function getAllTotalWeeksAndSundays(allItems) {
  const groups = Object.keys(allItems);

  const onlyModules = groups.reduce((acc, prev) => {
    return acc.concat(...allItems[prev]);
  }, []);

  const firstDate = moment.min(onlyModules.map(module => module.starting_date));
  const lastDate = moment.max(onlyModules.map(module => module.ending_date));

  return _getAllWeeks(firstDate, lastDate);
}

export function getWeeksBeforeAndAfter(allWeeks, classModules) {
  // starting date of the first module of a class
  const firstModuleStartingDate = moment.min(
    classModules.map(week => week.starting_date)
  );

  // the ending date of the last module of a class
  const lastModuleEndingDate = moment.max(
    classModules.map(week => week.ending_date)
  );

  // get an array with all the weeks before the start of this class
  const weeksBefore = allWeeks.filter(week =>
    week[0].isBefore(firstModuleStartingDate)
  );

  // get an array with all the weeks agter the course has ended
  const weeksAfter = allWeeks.filter(week =>
    week[1].isAfter(lastModuleEndingDate)
  );

  return {
    weeksBefore,
    weeksAfter
  };
}

export function getCurrentWeek(week, width) {
  const today = new moment();
  if (!today.isAfter(week[0]) || !today.isBefore(week[1])) return null;
  const dayDiff = today.diff(week[0], 'days');
  const oneDayWidth = width / 7;
  const offset = oneDayWidth * dayDiff;
  return offset;
}

export function weekLonger(chosenModule, groups) {
  const { duration } = chosenModule;
  const newDuration = duration + 1;
  console.log('new duration', newDuration);
  return _patchGroupsModules(
    chosenModule,
    null,
    newDuration,
    null,
    null,
    groups
  );
}

export function weekShorter(chosenModule, groups) {
  const { duration } = chosenModule;
  const newDuration = duration - 1;
  console.log('new duration', newDuration);
  return _patchGroupsModules(
    chosenModule,
    null,
    newDuration,
    null,
    null,
    groups
  );
}

export function moveRight(chosenModule, groups) {
  const { position } = chosenModule;
  const newPosition = position + 1;
  console.log('new position', newPosition);
  return _patchGroupsModules(
    chosenModule,
    newPosition,
    null,
    null,
    null,
    groups
  );
}

export function moveLeft(chosenModule, groups) {
  console.log(groups);
  const { position } = chosenModule;
  const newPosition = position - 1;
  console.log('new position', newPosition);
  return _patchGroupsModules(
    chosenModule,
    newPosition,
    null,
    null,
    null,
    groups
  );
}

// helper functions

function _patchGroupsModules(
  item,
  newPosition,
  newDuration,
  teacher1_id,
  teacher2_id,
  groups
) {
  // we need position for request and group_name to filter the group id wanted
  const { position, group_name } = item;

  const group_id = groups
    .filter(group => group.group_name === group_name)
    .map(group => group.id)[0];

  const body = {
    duration: newDuration,
    position: newPosition,
    teacher1_id,
    teacher2_id
  };
  // return fetch(`${BASE_URL}/api/running/update/${group_id}/${position}`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'Application/json' },
  //   body: JSON.stringify(body)
  // }).then(res => res.json());
  return Promise.resolve();
}

function _getAllWeeks(startingDate, endingDate) {
  const allSundays = [];
  let tempDate = startingDate.clone();
  while (tempDate.day(0).isBefore(endingDate)) {
    allSundays.push(moment(tempDate));
    tempDate = tempDate.add(1, 'weeks');
  }

  const allWeeks = allSundays.reduce((acc, prevItem, index, arr) => {
    const nextItem = arr[index + 1];
    if (!nextItem) return acc;
    const oneWeek = [prevItem, nextItem];
    acc.push(oneWeek);
    return acc;
  }, []);

  return { allWeeks, allSundays };
}

// this is not used yet cause there's nothing shown to user to invoke it
export function assignTeachers(item, groups, teacher1, teacher2) {
  const teacher1_id = teacher1 ? teacher1.id : null;
  const teacher2_id = teacher2 ? teacher2.id : null;
  // return _patchGroupsModules(item, null, null, teacher1_id, teacher2_id, groups);
  return Promise.resolve();
}

export function addNewClass(className, starting_date) {
  const date = new Date(starting_date);
  const body = {
    group_name: className,
    starting_date: date.toISOString()
  };

  // return fetch(`${BASE_URL}/api/groups`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'Application/json'
  //   },
  //   body: JSON.stringify(body)
  // }).then(res => res.json());
  return Promise.resolve();
}

export function getALlPossibleModules() {
  return fetch(`${BASE_URL}/api/modules`).then(res => res.json());
}

export function getAllGroupsWithIds() {
  return fetch(`${BASE_URL}/api/groups`).then(res => res.json());
}

export function addNewModuleToClass(
  selectedModule,
  selectedGroup,
  duration,
  selectedDate,
  items
) {
  if (selectedGroup.group_name) {
    console.log('here will return something');
    return _patchNewModuleForOneGroup(
      selectedModule,
      selectedDate,
      selectedGroup.id,
      items,
      duration
    );
  } else {
    // something later
    console.log('doing nothing');
  }
  return Promise.resolve();
}

function _patchNewModuleForOneGroup(
  selectedModule,
  selectedDate,
  selectedGroupId,
  items,
  duration
) {
  let collision = false;
  const selectedDateMoment = new moment(selectedDate, 'YYYY-MM-DD');
  for (let item of items) {
    // case 1 it is betweeen the staritng and the end! Nasty
    if (selectedDateMoment.isBetween(item.starting_date, item.ending_date)) {
      collision = true;
    }
    if (selectedDateMoment.diff(item.ending_date) === 0) {
      console.log('its at the end of the damn module!');
      console.log('item position', item.position);
      const position = +item.position + 1; // to add it after and not in place
      console.log(position);
      const { id } = selectedModule;
      console.warn('here and will return it');
      return _addModule(id, selectedGroupId, position);
    }
  }
  console.log('collision ?', collision);
}

function _addModule(moduleId, groupId, position) {
  // return fetch(
  //   `${BASE_URL}/api/running/add/${moduleId}/${groupId}/${position}`,
  //   {
  //     method: 'PATCH',
  //     headers: { 'Content-Type': 'Application/json' }
  //   }
  // ).then(res => res.json());
  return Promise.resolve('Hi');
}

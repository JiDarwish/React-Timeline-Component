import moment from 'moment';
import fakeData from '../Data/fakeData.json';

const BASE_URL = 'http://localhost:3005';

//return a promise with `then` getting the json formatted data
export function getTimelineItems() {
  return Promise.resolve(fakeData);
  // return fetch(BASE_URL + '/api/timeline').then(res => res.json());
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

  const allWeeks = _getAllWeeks(firstDate, lastDate);

  return allWeeks;
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

export function weekLonger(chosenModule) {
  const { duration } = chosenModule;
  const newDuration = duration + 1;
  console.log('new duration', newDuration);
  return _patchModules(chosenModule, null, newDuration);
}

export function weekShorter(chosenModule) {
  const { duration } = chosenModule;
  const newDuration = duration - 1;
  console.log('new duration', newDuration);
  return _patchModules(chosenModule, null, newDuration);
}

export function moveRight(chosenModule) {
  const { position } = chosenModule;
  const newPosition = position + 1;
  console.log('new position', newPosition);
  return _patchModules(chosenModule, newPosition);
}

export function moveLeft(chosenModule) {
  const { position } = chosenModule;
  const newPosition = position - 1;
  console.log('new position', newPosition);
  return _patchModules(chosenModule, newPosition);
}

// helper functions

async function _patchModules(
  item,
  newPosition,
  newDuration,
  teacher1_id,
  teacher2_id
) {
  // get all the groups to get the id of the group which items you're chainging
  const groups = await fetch(`${BASE_URL}/api/groups`)
    .then(res => res.json())
    .catch(err => {
      return console.log(err);
    });
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

  return allWeeks;
}

// this is not used yet cause there's nothing shown to user to invoke it
export function assignTeachers(item, teacher1, teacher2) {
  const { groupId, position } = item;
  const teacher1_id = teacher1 && teacher1.id;
  const teacher2_id = teacher2 && teacher2.id;

  const body = {
    teacher1_id,
    teacher2_id
  };

  // TODO: uncomment thisrop
  // fetch(`${BASE_URL}/api/running/update/${groupId}/${position}`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'Application/json',
  //   },
  //   body: JSON.stringify(body);
  // });
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

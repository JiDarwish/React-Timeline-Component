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

export function weekLonger(chosenModule, originalData) {
  const toBeUpdatedModule = _extractModule(chosenModule, originalData);
  toBeUpdatedModule.duration = ++toBeUpdatedModule.duration;
  console.log('plus a week', toBeUpdatedModule);
  // return _patchModules(originalData);
  return Promise.resolve(); // for now TODO:
}

export function weekShorter(chosenModule, originalData) {
  const toBeUpdatedModule = _extractModule(chosenModule, originalData);
  toBeUpdatedModule.duration = --toBeUpdatedModule.duration;
  console.log('minus a week', toBeUpdatedModule);
  // return _patchModules(originalData);
  return Promise.resolve(); // for now TODO:
}

export function moveRight(chosenModule, originalData) {
  const toBeUpdatedModule = _extractModule(chosenModule, originalData);
  const indexModuleAfter =
    originalData[chosenModule.group_name].indexOf(toBeUpdatedModule) + 1;
  const moduleAfter = originalData[chosenModule.group_name][indexModuleAfter];

  const temp = moduleAfter.position;

  moduleAfter.position = toBeUpdatedModule.position;
  toBeUpdatedModule.position = temp;

  // return _patchModules(originalData);
  console.log('updated', toBeUpdatedModule.position);
  console.log('shifted', moduleAfter.position);

  return Promise.resolve(); // for now TODO:
}

export function moveLeft(chosenModule, originalData) {
  const toBeUpdatedModule = _extractModule(chosenModule, originalData);
  const indexModuleBefore =
    originalData[chosenModule.group_name].indexOf(toBeUpdatedModule) - 1;
  const moduleBefore = originalData[chosenModule.group_name][indexModuleBefore];

  const temp = moduleBefore.position;

  moduleBefore.position = toBeUpdatedModule.position;
  toBeUpdatedModule.position = temp;

  console.log('updated', toBeUpdatedModule.position);
  console.log('shifted', moduleBefore.position);
  // return _patchModules(originalData);
  return Promise.resolve(); // for now TODO:
}

// helper functions

function _extractModule(module, originalData) {
  return originalData[module.group_name].filter(
    item => item.running_module_id === module.running_module_id
  )[0];
}

function _patchModules(modules) {
  return fetch(`${BASE_URL}/api/timeline`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(modules)
  }).then(res => res.json());
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

  // TODO: uncomment this
  // fetch(`${BASE_URL}/api/running/update/${groupId}/${position}`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'Application/json',
  //   },
  //   body: JSON.stringify(body);
  // });
  return Promise.resolve();
}

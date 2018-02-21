import moment from 'moment';
import fakeData from '../Data/fakeData.json';

//return a promise with `then` getting the json formatted data
export function getTimelineItems(url) {
  return Promise.resolve(fakeData);
  // return fetch(url).then(res => res.json());
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

///////////////////////////////////////////////////////////////////////// Not really needed
// export function getTotalNumOfWeeks(startingDate, endingDate) {
//   return endingDate.diff(startingDate, 'weeks');
// }

export function getCurrentWeek(week, width) {
  const today = new moment();
  if (!today.isAfter(week[0]) || !today.isBefore(week[1])) return null;
  const dayDiff = today.diff(week[0], 'days');
  const oneDayWidth = width / 7;
  const offset = oneDayWidth * dayDiff;
  return offset;
}

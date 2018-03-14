import TimelineStore from './timelineStore';

// stores

export const timelineStore = (window.timelineStore = TimelineStore());

// types of changes

export const TIMELINE_GROUPS_CHANGED = 'TIMELINE_GROUPS_CHANGED';
export const TIMELINE_ITEMS_CHANGED = 'TIMELINE_ITEMS_CHANGED';
export const ALL_WEEKS_CHANGED = 'ALL_WEEKS_CHANGED';
export const TODAY_MARKER_REFERENCE = 'TODAY_MARKER_REFERENCE';
export const SELECTED_MODULE_ID_CHANGED = 'SELECT_MODULE_CHANGED';
export const ALL_POSSIBLE_MODULES_CHANGED = 'ALL_POSSIBLE_MODULES_CHANGED';
export const ALL_SUNDAYS_CHANGED = 'ALL_SUNDAYS_CHANGED';
export const GROUPS_WITH_IDS_CHANGED = 'GROUPS_WITH_IDS_CHANGED';
export const ALL_TEACHERS_CHAGNED = 'ALL_TEACHERS_CHAGNED';
export const INFO_SELECTED_MDOULE_CHANGED = 'INFO_SELECTED_MDOULE_CHANGED';

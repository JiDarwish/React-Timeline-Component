import TimelineStore from './timelineStore';

// stores

export const timelineStore = (window.timelineStore = TimelineStore());

// types of changes

export const TIMELINE_GROUPS_CHANGED = 'TIMELINE_GROUPS_CHANGED';
export const TIMELINE_ITEMS_CHANGED = 'TIMELINE_ITEMS_CHANGED';
export const ALL_WEEKS_CHANGED = 'ALL_WEEKS_CHANGED';
export const MODAL_STATE_CHANGED = 'MODAL_STATE_CHANGED';
export const TODAY_MARKER_REFERENCE = 'TODAY_MARKER_REFERENCE';

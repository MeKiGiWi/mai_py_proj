export type TEvent = {
  group_name: string | null;
  lesson_name: string | null;
  lesson_type: string | null;
  teacher: string | null;
  place: string | null;
  start_date: Date | null;
};

export type TCell = {
  day: string;
  start: string;
  end: string;
};

export type TCurrentFilters = {
  selectedGroup: string | null;
  selectedTeacher: string | null;
  selectedPlace: string | null;
  cycleStartDate: Date;
  activeWeek: number;
};

export type TCurrentMetrics = {
  teachers: string[];
  places: string[];
  weeks: Date[];
  groups: string[];
};

export type TNote = {
  id: string;
  content: string;
  createdAt: Date;
};

export type TNotesState = {
  list: TNote[];
  newNote: string;
};

export type TSelectedEvent = {
  event: TEvent;
  eventKey: string;
};

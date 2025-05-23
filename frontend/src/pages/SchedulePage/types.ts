export type TEvent = {
    group_name: string | null;
    lesson_name: string | null;
    lesson_type: string | null;
    teacher: string | null;
    place: string | null;
    start_date: string | null;
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
};
  
export type TCurrentMetrics = {
    teachers: string[];
    places: string[];
    weeks: Date[];
    groups: string[];
};
  
export type TNotesState = {
    list: string[];
    newNote: string;
};
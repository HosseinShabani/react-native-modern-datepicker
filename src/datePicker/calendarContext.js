import {createContext, useContext} from 'react';

const CalendarContext = createContext();

export const useCalendar = () => {
  return useContext(CalendarContext);
};

import {createContext, useContext} from 'react';

export const CalendarContext = createContext();

export const useCalendar = () => {
  const contextValue = useContext(CalendarContext);
  return contextValue;
};

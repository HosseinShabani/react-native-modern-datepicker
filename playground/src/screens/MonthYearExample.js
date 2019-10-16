/* eslint-disable no-alert */
import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

const MonthYearExample = () => {
  return (
    <DatePicker
      mode="monthYear"
      selectorStartingYear={2000}
      onMonthYearChange={date => alert(date)}
    />
  );
};

export default MonthYearExample;

/* eslint-disable no-alert */
import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

const BasicUsage = ({ defaultOptions }) => {
  return (
    <DatePicker
      options={defaultOptions}
      onSelectedChange={date => alert(date)}
    />
  );
};

export default BasicUsage;

/* eslint-disable no-alert */
import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

const TimePickerExample = () => {
  return (
    <DatePicker
      mode="time"
      minuteInterval={3}
      onTimeChange={time => alert(time)}
    />
  );
};

export default TimePickerExample;

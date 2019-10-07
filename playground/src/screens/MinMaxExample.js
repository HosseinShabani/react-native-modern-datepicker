/* eslint-disable no-alert */
import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

const MinMaxExample = () => {
  return (
    <DatePicker minimumDate="2019/10/12" onDateChange={date => alert(date)} />
  );
};

export default MinMaxExample;

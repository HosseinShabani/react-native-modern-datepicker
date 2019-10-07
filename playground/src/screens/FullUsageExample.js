/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const FullUsageExample = ({ defaultOptions }) => {
  const [selectedDate, setSelectedDate] = useState('');
  return (
    <>
      <Text style={styles.text}>{selectedDate}</Text>
      <DatePicker
        options={{
          ...defaultOptions,
          textFontSize: 14,
          headerAnimationDistance: 100,
          mainColor: '#EA3546',
        }}
        onSelectedChange={date => setSelectedDate(date)}
        onMonthYearChange={date => alert(date)}
        onTimeChange={date => alert(date)}
        onDateChange={date => alert(date)}
        current="2020-07-13"
        selected="2020-07-23"
        minimumDate="2020-02-17"
        maximumDate="2020-07-25"
        selectorStartingYear={2000}
        selectorEndingYear={2030}
        disableDateChange={false}
        mode="datepicker"
        minuteInterval={30}
        style={styles.calendar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginBottom: 20,
    color: '#EA3546',
    fontFamily: 'OpenSans-Bold',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
  },
});

export default FullUsageExample;

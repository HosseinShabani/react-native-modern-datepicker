export const INSTALLATION_CODE = `
  yarn add react-native-modern-datepicker
//or if you prefer npm
npm install react-native-modern-datepicker --save
`;

export const EXAMPLE_PROJECT_CLONE_CODE = `
$ git clone git@github.com:HosseinShabani/react-native-modern-datepicker.git
$ cd playground && yarn
$ react-native run-ios //or run-android
`;
export const BASIC_USAGE_CODE = `
import React, { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';

const BasicUsage = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <DatePicker
      onSelectedChange={date => setSelectedDate(date)}
    />
  );
};
`;
export const JALAAI_EXAMPLE_CODE = `
import React from 'react';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';

const JalaaliExample = () => {
  return (
    <DatePicker
      language='jalaali'
      options={{
        defaultFont: 'Shabnam-Light',
        headerFont: 'Shabnam-Medium',
      }}
      selected={getFormatedDate(new Date(), 'jYYYY/jMM/jDD')}
    />
  );
};
`;

export const MIN_MAX_EXAMPLE_CODE = `
import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

const MinMaxExample = () => {
  return (
    <DatePicker
      current="2020-07-13"
      minimumDate="2020-02-17"
      maximumDate="2020-07-25"
    />
  );
};
`;

export const TIME_PICKER_EXAMPLE = `
import React, { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';

const TimePickerExample = () => {
  const [time, setTime] = useState('');

  return (
    <DatePicker
      mode="time"
      minuteInterval={3}
      onTimeChange={selectedTime => setTime(selectedTime)}
    />
  );
};
`;
export const MONTH_YEAR_EXAMPLE = `
import React, { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';

const MonthYearExample = () => {
  const [date, setDate] = useState('');

  return (
    <DatePicker
      mode="monthYear"
      selectorStartingYear={2000}
      onMonthYearChange={selectedDate => setDate(selectedDate)}
    />
  );
};
`;

export const CUSTOMIZATION_EXAMPLE = `
import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

const FullUsageExample = () => {
  return (
    <DatePicker
      options={{
        backgroundColor: '#090C08',
        textHeaderColor: '#FFA25B',
        textDefaultColor: '#F6E7C1',
        selectedTextColor: '#fff',
        mainColor: '#F4722B',
        textSecondaryColor: '#D6C7A1',
        borderColor: 'rgba(122, 146, 165, 0.1)',
      }}
      current="2020-07-13"
      selected="2020-07-23"
      mode="calendar"
      minuteInterval={30}
      style={{ borderRadius: 10 }}
    />
  );
};
`;

export const UTILS_CODE = `
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';

getToday(); // returns today's date.. e.g: 2019/10/12
//Get formatted date from Date object or date string "2019/..."
getFormatedDate(new Date(), "YYYY/MM/DD h:m"); 
getFormatedDate(timestamp, "jYYYY/jMM/jDD h:m"); //for jalaali

`;

/* eslint-disable no-alert */
import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

const BasicUsage = ({ defaultOptions }) => {
  return (
    <DatePicker
      options={defaultOptions}
      reverse={false}
      gregorianConfigs={
        {
          dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
          monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        }
      }
      onSelectedChange={date => alert(date)}
    />
  );
};

export default BasicUsage;

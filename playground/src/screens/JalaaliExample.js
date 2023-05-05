import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

const JalaaliExample = () => {
  return (
    <DatePicker
      language='jalaali'
      options={{
        defaultFont: 'Shabnam-Light',
        headerFont: 'Shabnam-Medium',
      }}
      selected="1398/07/21"
    />
  );
};

export default JalaaliExample;

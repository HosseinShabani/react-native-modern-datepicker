import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useCalendar} from '../DatePicker';

const Days = () => {
  const {options, state, utils, onDateChange} = useCalendar();
  const [mainState, setMainState] = state;
  const [itemSize, setItemSize] = useState(0);
  const style = styles(options);
  const days = useMemo(() => utils.getMonthDays(mainState.activeDate));

  const onSelectDay = date => {
    setMainState({
      type: 'set',
      selectedDate: date,
    });
    onDateChange(utils.getFormated(utils.getDate(date), 'dateFormat'));
  };

  const changeItemHeight = ({nativeEvent}) => {
    const {width} = nativeEvent.layout;
    !itemSize && setItemSize((width / 7).toFixed(2) * 1 - 0.5);
  };

  return (
    <View style={[style.container, utils.flexDirection]} onLayout={changeItemHeight}>
      {days.map((day, n) => (
        <View
          key={n}
          style={{
            width: itemSize,
            height: itemSize,
          }}>
          {day && (
            <TouchableOpacity
              style={[
                style.dayItem,
                {
                  borderRadius: itemSize / 2,
                },
                mainState.selectedDate === day.date && style.dayItemSelected,
              ]}
              onPress={() => !day.disabled && onSelectDay(day.date)}
              activeOpacity={0.8}>
              <Text
                style={[
                  style.dayText,
                  mainState.selectedDate === day.date && style.dayTextSelected,
                  day.disabled && style.dayTextDisabled,
                ]}>
                {day.dayString}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      flexWrap: 'wrap',
    },
    dayItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 3,
    },
    dayItemSelected: {
      backgroundColor: theme.mainColor,
    },
    dayText: {
      fontFamily: theme.defaultFont,
      fontSize: theme.textFontSize,
      color: theme.textDefaultColor,
      textAlign: 'center',
      width: '100%',
    },
    dayTextSelected: {
      color: theme.selectedTextColor,
      fontFamily: theme.headerFont,
    },
    dayTextDisabled: {
      opacity: 0.2,
    },
  });

export {Days};

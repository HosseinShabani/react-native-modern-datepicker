import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Text, Image, StyleSheet, Animated, I18nManager} from 'react-native';

import {useCalendar} from '../DatePicker';

const Header = ({changeMonth}) => {
  const {
    options,
    disableDateChange,
    state,
    utils,
    minimumDate,
    maximumDate,
    isGregorian,
    mode,
  } = useCalendar();
  const [mainState, setMainState] = state;
  const style = styles(options);
  const [disableChange, setDisableChange] = useState(false);
  const [
    {lastDate, shownAnimation, hiddenAnimation},
    changeMonthAnimation,
  ] = utils.useMonthAnimation(mainState.activeDate, options.headerAnimationDistance, () =>
    setDisableChange(false),
  );
  const prevDisable =
    disableDateChange || (minimumDate && utils.checkArrowMonthDisabled(mainState.activeDate, true));
  const nextDisable =
    disableDateChange ||
    (maximumDate && utils.checkArrowMonthDisabled(mainState.activeDate, false));

  const onChangeMonth = (type) => {
    if (disableChange) return;
    setDisableChange(true);
    changeMonthAnimation(type);
    const modificationNumber = type === 'NEXT' ? 1 : -1;
    const newDate = utils
      .getDate(mainState.activeDate)
      .add(modificationNumber, isGregorian ? 'month' : 'jMonth');
    setMainState({
      type: 'set',
      activeDate: utils.getFormated(newDate),
    });
    changeMonth(type);
  };

  return (
    <View style={[style.container, I18nManager.isRTL && style.reverseContainer]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => !nextDisable && onChangeMonth('NEXT')}
        style={style.arrowWrapper}>
        <Image
          source={require('../../assets/arrow.png')}
          style={[style.arrow, nextDisable && style.disableArrow]}
        />
      </TouchableOpacity>
      <View style={style.monthYearContainer}>
        <Animated.View
          style={[
            style.monthYear,
            shownAnimation,
            style.activeMonthYear,
            I18nManager.isRTL && style.reverseMonthYear,
          ]}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[style.centerWrapper, style.monthYearWrapper, utils.flexDirection]}
            onPress={() =>
              !disableDateChange &&
              setMainState({
                type: 'toggleMonth',
              })
            }>
            <Text style={[style.headerText, style.monthText]}>
              {utils.getMonthYearText(mainState.activeDate).split(' ')[0]}
            </Text>
            <Text style={[style.headerText, style.monthText]}>
              {utils.getMonthYearText(mainState.activeDate).split(' ')[1]}
            </Text>
          </TouchableOpacity>
          {mode === 'datepicker' && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                style.centerWrapper,
                {marginRight: I18nManager.isRTL ? 0 : 5, marginLeft: I18nManager.isRTL ? 5 : 0},
              ]}
              onPress={() =>
                setMainState({
                  type: 'toggleTime',
                })
              }>
              <Text style={style.headerText}>
                {utils.toPersianNumber(utils.getTime(mainState.activeDate))}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
        <Animated.View
          style={[
            style.monthYear,
            hiddenAnimation,
            utils.flexDirection,
            I18nManager.isRTL && style.reverseMonthYear,
          ]}>
          <Text style={style.headerText}>{utils.getMonthYearText(lastDate).split(' ')[0]}</Text>
          <Text style={style.headerText}>{utils.getMonthYearText(lastDate).split(' ')[1]}</Text>
          {mode === 'datepicker' && (
            <Text style={style.headerText}>
              {utils.toPersianNumber(utils.getTime(mainState.activeDate))}
            </Text>
          )}
        </Animated.View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => !prevDisable && onChangeMonth('PREVIOUS')}
        style={style.arrowWrapper}>
        <Image
          source={require('../../assets/arrow.png')}
          style={[style.arrow, style.leftArrow, prevDisable && style.disableArrow]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row-reverse',
    },
    reverseContainer: {
      flexDirection: 'row',
    },
    arrowWrapper: {
      padding: 20,
      position: 'relative',
      zIndex: 1,
      opacity: 1,
    },
    arrow: {
      width: 18,
      height: 18,
      opacity: 0.9,
      tintColor: theme.mainColor,
      margin: 2,
    },
    leftArrow: {
      transform: [
        {
          rotate: '180deg',
        },
      ],
    },
    disableArrow: {
      opacity: 0,
    },
    monthYearContainer: {
      flex: 1,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    monthYear: {
      position: 'absolute',
      alignItems: 'center',
      flexDirection: 'row-reverse',
    },
    reverseMonthYear: {
      flexDirection: 'row',
    },
    activeMonthYear: {
      zIndex: 999,
    },
    monthYearWrapper: {
      alignItems: 'center',
    },
    headerText: {
      fontSize: theme.textHeaderFontSize,
      padding: 2,
      color: theme.textHeaderColor,
      fontFamily: theme.defaultFont,
      textAlignVertical: 'center',
    },
    monthText: {
      fontFamily: theme.headerFont,
    },
    centerWrapper: {
      borderColor: theme.borderColor,
      paddingVertical: 4,
      paddingHorizontal: 8,
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: 1,
    },
    time: {
      marginRight: 5,
    },
  });

Header.defaultProps = {
  changeMonth: () => null,
};

Header.propTypes = {
  changeMonth: PropTypes.func,
};

export {Header};

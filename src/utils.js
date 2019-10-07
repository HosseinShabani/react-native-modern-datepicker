import {useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import moment from 'moment-jalaali';

const m = moment();
const jalaaliConfigs = {
  dayNames: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
  dayNamesShort: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
  monthNames: [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ],
  selectedFormat: 'jYYYY/jMM/jDD',
  dateFormat: 'jYYYY/jMM/jDD',
  monthYearFormat: 'jYYYY jMM',
  timeFormat: 'HH:mm ',
  hour: 'ساعت',
  minute: 'دقیقه',
  timeSelect: 'انتخاب',
  timeClose: 'بستن',
};
const gregorianConfigs = {
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
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
  selectedFormat: 'YYYY/MM/DD',
  dateFormat: 'YYYY/MM/DD',
  monthYearFormat: 'YYYY MM',
  timeFormat: 'HH:mm',
  hour: 'Hour',
  minute: 'Minute',
  timeSelect: 'Select',
  timeClose: 'Close',
};

class utils {
  constructor({minimumDate, maximumDate, isGregorian, mode}) {
    this.data = {
      minimumDate,
      maximumDate,
      isGregorian,
    };
    this.config = isGregorian ? gregorianConfigs : jalaaliConfigs;
    if (mode === 'time' || mode === 'datepicker') {
      this.config.selectedFormat = this.config.dateFormat + ' ' + this.config.timeFormat;
    }
  }

  getFormated = (date, formatName = 'selectedFormat') => date.format(this.config[formatName]);

  getTime = time => this.getDate(time).format(this.config.timeFormat);

  getToday = () => this.getFormated(m, 'dateFormat');

  getMonthName = month => this.config.monthNames[month];

  toPersianNumber = value => {
    const {isGregorian} = this.data;
    return isGregorian
      ? this.toEnglish(String(value))
      : String(value).replace(/[0-9]/g, w =>
          String.fromCharCode(w.charCodeAt(0) + '۰'.charCodeAt(0) - 48),
        );
  };

  toEnglish = value => {
    const charCodeZero = '۰'.charCodeAt(0);
    return value.replace(/[۰-۹]/g, w => w.charCodeAt(0) - charCodeZero);
  };

  getDate = time => moment(time, this.config.selectedFormat);

  getMonthYearText = time => {
    const {isGregorian} = this.data;
    const date = this.getDate(time);
    const year = this.toPersianNumber(isGregorian ? date.year() : date.jYear());
    const month = this.getMonthName(isGregorian ? date.month() : date.jMonth());
    return `${month} ${year}`;
  };

  checkMonthDisabled = time => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    const date = this.getDate(time);
    let disabled = false;
    if (minimumDate) {
      const lastDayInMonth = isGregorian ? date.date(29) : date.jDate(29);
      disabled = lastDayInMonth < this.getDate(minimumDate);
    }
    if (maximumDate && !disabled) {
      const firstDayInMonth = isGregorian ? date.date(1) : date.jDate(1);
      disabled = firstDayInMonth > this.getDate(maximumDate);
    }
    return disabled;
  };

  checkArrowMonthDisabled = (time, next) => {
    const {isGregorian} = this.data;
    const date = this.getDate(time);
    return this.checkMonthDisabled(
      this.getFormated(date.add(next ? -1 : 1, isGregorian ? 'month' : 'jMonth')),
    );
  };

  checkYearDisabled = (year, next) => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    const y = isGregorian
      ? this.getDate(next ? maximumDate : minimumDate).year()
      : this.getDate(next ? maximumDate : minimumDate).jYear();
    return next ? year >= y : year <= y;
  };

  checkSelectMonthDisabled = (time, month) => {
    const {isGregorian} = this.data;
    const date = this.getDate(time);
    const dateWithNewMonth = isGregorian ? date.month(month) : date.jMonth(month);
    return this.checkMonthDisabled(this.getFormated(dateWithNewMonth));
  };

  validYear = (time, year) => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    const date = isGregorian ? this.getDate(time).year(year) : this.getDate(time).jYear(year);
    let validDate = this.getFormated(date);
    if (minimumDate && date < this.getDate(minimumDate)) {
      validDate = minimumDate;
    }
    if (maximumDate && date > this.getDate(maximumDate)) {
      validDate = maximumDate;
    }
    return validDate;
  };

  getMonthDays = time => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    const date = this.getDate(time);
    const currentMonthDays = isGregorian
      ? date.daysInMonth()
      : moment.jDaysInMonth(date.jYear(), date.jMonth());
    const firstDay = isGregorian ? date.date(1) : date.jDate(1);
    const dayOfMonth = (firstDay.day() + Number(!isGregorian)) % 7;
    // alert(dayOfMonth);
    return [
      ...new Array(dayOfMonth),
      ...[...new Array(currentMonthDays)].map((i, n) => {
        const dateString = this.getFormated(isGregorian ? date.date(n + 1) : date.jDate(n + 1));
        let disabled = false;
        if (minimumDate) {
          disabled = this.getDate(dateString) < this.getDate(minimumDate);
        }
        if (maximumDate && !disabled) {
          disabled = this.getDate(dateString) > this.getDate(maximumDate);
        }

        return {
          dayString: this.toPersianNumber(n + 1),
          day: n + 1,
          date: dateString,
          disabled,
        };
      }),
    ];
  };

  useMonthAnimation = (activeDate, distance) => {
    const [lastDate, setLastDate] = useState(activeDate);
    const [changeWay, setChangeWay] = useState(null);
    const monthYearAnimation = useRef(new Animated.Value(0)).current;

    const changeMonthAnimation = type => {
      setChangeWay(type);
      setLastDate(activeDate);
      monthYearAnimation.setValue(1);
      Animated.timing(monthYearAnimation, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
        easing: Easing.bezier(0.17, 0.67, 0.46, 1),
      }).start();
    };

    const shownAnimation = {
      opacity: monthYearAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      }),
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, changeWay === 'NEXT' ? -distance : distance],
          }),
        },
      ],
    };

    const hiddenAnimation = {
      opacity: monthYearAnimation,
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [changeWay === 'NEXT' ? distance : -distance, 0],
          }),
        },
      ],
    };

    return [{lastDate, shownAnimation, hiddenAnimation}, changeMonthAnimation];
  };
}

export {utils};

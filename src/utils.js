import {useRef, useState} from 'react';
import {Animated, Easing, I18nManager} from 'react-native';
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
const brazilianConfigs = {
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  selectedFormat: 'DD/MM/YYYY',
  dateFormat: 'DD/MM/YYYY',
  monthYearFormat: 'MM YYYY',
  timeFormat: 'HH:mm',
  hour: 'Hora',
  minute: 'Minuto',
  timeSelect: 'Selecione',
  timeClose: 'Fechar',
};

class utils {
  constructor({minimumDate, maximumDate, language, mode, reverse, configs}) {
    this.data = {
      minimumDate,
      maximumDate,
      language,
      reverse: reverse === 'unset' ? !language : reverse,
    };
    if (language === 'gregorian') {
      this.config = gregorianConfigs;
    } else if (language === 'brazilian') {
      this.config = brazilianConfigs;
    } else {
      this.config = jalaaliConfigs;
    }
    this.config = {...this.config, ...configs};
    if (mode === 'time' || mode === 'datepicker') {
      this.config.selectedFormat = this.config.dateFormat + ' ' + this.config.timeFormat;
    }
  }

  get flexDirection() {
    return {flexDirection: this.data.reverse ? (I18nManager.isRTL ? 'row' : 'row-reverse') : 'row'};
  }

  getFormated = (date, formatName = 'selectedFormat') => date.format(this.config[formatName]);

  getFormatedDate = (date = new Date(), format = 'YYYY/MM/DD') => moment(date).format(format);

  getTime = (time) => this.getDate(time).format(this.config.timeFormat);

  getToday = () => this.getFormated(m, 'dateFormat');

  getMonthName = (month) => this.config.monthNames[month];

  toPersianNumber = (value) => {
    const {language} = this.data;
    return language !== 'jalaali'
      ? this.toEnglish(String(value))
      : String(value).replace(/[0-9]/g, (w) =>
          String.fromCharCode(w.charCodeAt(0) + '۰'.charCodeAt(0) - 48),
        );
  };

  toEnglish = (value) => {
    const charCodeZero = '۰'.charCodeAt(0);
    return value.replace(/[۰-۹]/g, (w) => w.charCodeAt(0) - charCodeZero);
  };

  getDate = (time) => moment(time, this.config.selectedFormat);

  getMonthYearText = (time) => {
    const {language} = this.data;
    const date = this.getDate(time);
    const year = this.toPersianNumber(language !== 'jalaali' ? date.year() : date.jYear());
    const month = this.getMonthName(language !== 'jalaali' ? date.month() : date.jMonth());
    return `${month} ${year}`;
  };

  checkMonthDisabled = (time) => {
    const {minimumDate, maximumDate, language} = this.data;
    const date = this.getDate(time);
    let disabled = false;
    if (minimumDate) {
      const lastDayInMonth = language !== 'jalaali' ? date.date(29) : date.jDate(29);
      disabled = lastDayInMonth < this.getDate(minimumDate);
    }
    if (maximumDate && !disabled) {
      const firstDayInMonth = language !== 'jalaali' ? date.date(1) : date.jDate(1);
      disabled = firstDayInMonth > this.getDate(maximumDate);
    }
    return disabled;
  };

  checkArrowMonthDisabled = (time, next) => {
    const {language} = this.data;
    const date = this.getDate(time);
    return this.checkMonthDisabled(
      this.getFormated(date.add(next ? -1 : 1, language !== 'jalaali' ? 'month' : 'jMonth')),
    );
  };

  checkYearDisabled = (year, next) => {
    const {minimumDate, maximumDate, language} = this.data;
    const y = language !== 'jalaali'
      ? this.getDate(next ? maximumDate : minimumDate).year()
      : this.getDate(next ? maximumDate : minimumDate).jYear();
    return next ? year >= y : year <= y;
  };

  checkSelectMonthDisabled = (time, month) => {
    const {language} = this.data;
    const date = this.getDate(time);
    const dateWithNewMonth = language !== 'jalaali' ? date.month(month) : date.jMonth(month);
    return this.checkMonthDisabled(this.getFormated(dateWithNewMonth));
  };

  validYear = (time, year) => {
    const {minimumDate, maximumDate, language} = this.data;
    const date = language !== 'jalaali' ? this.getDate(time).year(year) : this.getDate(time).jYear(year);
    let validDate = this.getFormated(date);
    if (minimumDate && date < this.getDate(minimumDate)) {
      validDate = minimumDate;
    }
    if (maximumDate && date > this.getDate(maximumDate)) {
      validDate = maximumDate;
    }
    return validDate;
  };

  getMonthDays = (time) => {
    const {minimumDate, maximumDate, language} = this.data;
    let date = this.getDate(time);
    const currentMonthDays = language !== 'jalaali'
      ? date.daysInMonth()
      : moment.jDaysInMonth(date.jYear(), date.jMonth());
    const firstDay = language !== 'jalaali' ? date.date(1) : date.jDate(1);
    const dayOfMonth = (firstDay.day() + Number(language !== 'jalaali')) % 7;
    return [
      ...new Array(dayOfMonth),
      ...[...new Array(currentMonthDays)].map((i, n) => {
        const thisDay = language !== 'jalaali' ? date.date(n + 1) : date.jDate(n + 1);
        let disabled = false;
        if (minimumDate) {
          disabled = thisDay < this.getDate(minimumDate);
        }
        if (maximumDate && !disabled) {
          disabled = thisDay > this.getDate(maximumDate);
        }

        date = this.getDate(time);
        return {
          dayString: this.toPersianNumber(n + 1),
          day: n + 1,
          date: this.getFormated(language ? date.date(n + 1) : date.jDate(n + 1)),
          disabled,
        };
      }),
    ];
  };

  useMonthAnimation = (activeDate, distance, onEnd = () => null) => {
    const [lastDate, setLastDate] = useState(activeDate);
    const [changeWay, setChangeWay] = useState(null);
    const monthYearAnimation = useRef(new Animated.Value(0)).current;

    const changeMonthAnimation = (type) => {
      setChangeWay(type);
      setLastDate(activeDate);
      monthYearAnimation.setValue(1);
      Animated.timing(monthYearAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 0.66, 0.54, 1),
      }).start(onEnd);
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

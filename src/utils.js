import {useRef, useState} from 'react';
import {Animated, Easing, I18nManager} from 'react-native';
import moment from 'moment-jalaali';

const m = moment();
const jalaaliConfigs = {
  dayNames: [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه شنبه',
    'چهارشنبه',
    'پنجشنبه',
    'جمعه',
  ],
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
const gregorianConfigs = locale => ({
  dayNames: localizeDayNams(locale),
  dayNamesShort: localizeDayNameShort(locale),
  monthNames: localizeMonths(locale),
  selectedFormat: 'YYYY/MM/DD',
  dateFormat: 'YYYY/MM/DD',
  monthYearFormat: 'YYYY MM',
  timeFormat: 'HH:mm',
  hour: localizeHourLabel(locale),
  minute: localizeMinutesLabel(locale),
  timeSelect: localizeSelectLabel(locale),
  timeClose: localizeCloseLabel(locale),
});

const localizeDayNams = locale => {
  switch (locale) {
    case 'es':
      return [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ];
    case 'fr':
      return [
        'Dimanche',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
      ];
    case 'pt':
      return [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
      ];
    case 'it':
      return [
        'Domenica',
        'Lunedì',
        'Martedì',
        'Mercoledì',
        'Giovedì',
        'Venerdì',
        'Sabato',
      ];
    case 'de':
      return [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
      ];
    default:
      return [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
  }
};

const localizeDayNameShort = locale => {
  switch (locale) {
    case 'es':
      return ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    case 'fr':
      return ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];
    case 'pt':
      return ['Do', 'Seg', 'Te', 'Qua', 'Qui', 'Sex', 'Sa'];
    case 'it':
      return ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'];
    case 'de':
      return ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    default:
      return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  }
};

const localizeHourLabel = locale => {
  switch (locale) {
    case 'es':
      return 'Hora';
    case 'fr':
      return 'Heure';
    case 'pt':
      return 'Hora';
    case 'it':
      return 'Ora';
    case 'de':
      return 'Stunde';
    default:
      return 'Hour';
  }
};

const localizeMinutesLabel = locale => {
  switch (locale) {
    case 'es':
      return 'Minutos';
    case 'fr':
      return 'Minutes';
    case 'pt':
      return 'Minutos';
    case 'it':
      return 'Minuti';
    case 'de':
      return 'Protokoll';
    default:
      return 'Minutes';
  }
};

const localizeSelectLabel = locale => {
  switch (locale) {
    case 'es':
      return 'Seleccionar';
    case 'fr':
      return 'Sélectionner';
    case 'pt':
      return 'Hora';
    case 'it':
      return 'Selezionare';
    case 'de':
      return 'Auswählen';
    default:
      return 'Select';
  }
};

const localizeCloseLabel = locale => {
  switch (locale) {
    case 'es':
      return 'Cerrar';
    case 'fr':
      return 'Fermer';
    case 'pt':
      return 'Fechar';
    case 'it':
      return 'Chiudere';
    case 'de':
      return 'Schließen';
    default:
      return 'Close';
  }
};

const localizeMonths = locale => {
  switch (locale) {
    case 'es':
      return [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
    case 'fr':
      return [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Julliet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ];
    case 'pt':
      return [
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
      ];
    case 'it':
      return [
        'Gennaio',
        'Febbraio',
        'Marzo',
        'Aprile',
        'Maggio',
        'Giugno',
        'Luglio',
        'Agosto',
        'Settembre',
        'Ottobre',
        'Novembre',
        'Dicembre',
      ];
    case 'de':
      return [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ];
    default:
      return [
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
      ];
  }
};

class utils {
  constructor({
    minimumDate,
    maximumDate,
    isGregorian,
    mode,
    reverse,
    configs,
    locale = 'en',
  }) {
    this.data = {
      minimumDate,
      maximumDate,
      isGregorian,
      reverse: reverse === 'unset' ? !isGregorian : reverse,
    };
    this.config = isGregorian ? gregorianConfigs(locale) : jalaaliConfigs;
    this.config = {...this.config, ...configs};
    if (mode === 'time' || mode === 'datepicker') {
      this.config.selectedFormat =
        this.config.dateFormat + ' ' + this.config.timeFormat;
    }
  }

  get flexDirection() {
    return {
      flexDirection: this.data.reverse
        ? I18nManager.isRTL
          ? 'row'
          : 'row-reverse'
        : 'row',
    };
  }

  getFormated = (date, formatName = 'selectedFormat') =>
    date.format(this.config[formatName]);

  getFormatedDate = (date = new Date(), format = 'YYYY/MM/DD') =>
    moment(date).format(format);

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
      this.getFormated(
        date.add(next ? -1 : 1, isGregorian ? 'month' : 'jMonth'),
      ),
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
    const dateWithNewMonth = isGregorian
      ? date.month(month)
      : date.jMonth(month);
    return this.checkMonthDisabled(this.getFormated(dateWithNewMonth));
  };

  validYear = (time, year) => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    const date = isGregorian
      ? this.getDate(time).year(year)
      : this.getDate(time).jYear(year);
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
    let date = this.getDate(time);
    const currentMonthDays = isGregorian
      ? date.daysInMonth()
      : moment.jDaysInMonth(date.jYear(), date.jMonth());
    const firstDay = isGregorian ? date.date(1) : date.jDate(1);
    const dayOfMonth = (firstDay.day() + Number(!isGregorian)) % 7;
    return [
      ...new Array(dayOfMonth),
      ...[...new Array(currentMonthDays)].map((i, n) => {
        const thisDay = isGregorian ? date.date(n + 1) : date.jDate(n + 1);
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
          date: this.getFormated(
            isGregorian ? date.date(n + 1) : date.jDate(n + 1),
          ),
          disabled,
        };
      }),
    ];
  };

  useMonthAnimation = (activeDate, distance, onEnd = () => null) => {
    const [lastDate, setLastDate] = useState(activeDate);
    const [changeWay, setChangeWay] = useState(null);
    const monthYearAnimation = useRef(new Animated.Value(0)).current;

    const changeMonthAnimation = type => {
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

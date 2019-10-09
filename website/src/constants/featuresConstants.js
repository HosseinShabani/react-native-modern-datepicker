import {
  BASIC_USAGE_CODE,
  JALAAI_EXAMPLE_CODE,
  MIN_MAX_EXAMPLE_CODE,
  TIME_PICKER_EXAMPLE,
  MONTH_YEAR_EXAMPLE,
  CUSTOMIZATION_EXAMPLE,
} from '.';

export const FEATURES = [
  {
    title: 'Basic usage',
    file: require('../assets/videos/basic_usage.gif'),
    description: `Here's the most basic way to use our "Modern" date picker.`,
    code: BASIC_USAGE_CODE,
  },
  {
    title: 'Jalaali',
    file: require('../assets/videos/jalaali.gif'),
    description: 'You also need Jalaali datepicker? Here it is.',
    code: JALAAI_EXAMPLE_CODE,
  },
  {
    title: 'Customizable',
    file: require('../assets/images/customization-example.jpg'),
    description: 'Got your own design system? You can easily apply it.',
    code: CUSTOMIZATION_EXAMPLE,
  },
  {
    title: 'Minimum & Maximum',
    file: require('../assets/videos/min_max.gif'),
    description: 'You gotta specify a range? Do it.',
    code: MIN_MAX_EXAMPLE_CODE,
  },
  {
    title: 'Time Picker',
    file: require('../assets/videos/time_picker.gif'),
    description: "You're only looking for a time picker? It's all taken care of.",
    code: TIME_PICKER_EXAMPLE,
  },
  {
    title: 'Month-Year Picker',
    file: require('../assets/videos/monthYear_picker.gif'),
    description: 'You want a month-year mode? Get it running as easy as pie.',
    code: MONTH_YEAR_EXAMPLE,
  },
];

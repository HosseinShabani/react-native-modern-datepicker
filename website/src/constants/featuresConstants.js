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
    file: require('../assets/videos/basic_usage.mp4'),
    poster: require('../assets/images/basic_usage_poster.jpg'),
    description: `Here's the most basic way to use our "Modern" date picker.`,
    code: BASIC_USAGE_CODE,
    isVideo: true,
  },
  {
    title: 'Jalaali',
    file: require('../assets/videos/jalaali.mp4'),
    poster: require('../assets/images/jalaali_poster.jpg'),
    description: 'You also need Jalaali datepicker? Here it is.',
    code: JALAAI_EXAMPLE_CODE,
    isVideo: true,
  },
  {
    title: 'Customizable',
    file: require('../assets/images/customization-example.jpg'),
    description: 'Got your own design system? You can easily apply it.',
    code: CUSTOMIZATION_EXAMPLE,
    isVideo: false,
  },
  {
    title: 'Minimum & Maximum',
    file: require('../assets/videos/min_max.mp4'),
    poster: require('../assets/images/min_max_poster.jpg'),
    description: 'You gotta specify a range? Do it.',
    code: MIN_MAX_EXAMPLE_CODE,
    isVideo: true,
  },
  {
    title: 'Time Picker',
    file: require('../assets/videos/timepicker.mp4'),
    poster: require('../assets/images/timepicker_poster.jpg'),
    description: "You're only looking for a time picker? It's all taken care of.",
    code: TIME_PICKER_EXAMPLE,
    isVideo: true,
  },
  {
    title: 'Month-Year Picker',
    file: require('../assets/videos/month-year.mp4'),
    poster: require('../assets/images/month_year_poster.jpg'),
    description: 'You want a month-year mode? Get it running as easy as pie.',
    code: MONTH_YEAR_EXAMPLE,
    isVideo: true,
  },
];

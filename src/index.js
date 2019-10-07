import {DatePicker} from './datePicker/DatePicker';
import {utils} from './utils';

export const {getFormatedDate, getToday} = new utils({isGregorian: true});
export default DatePicker;

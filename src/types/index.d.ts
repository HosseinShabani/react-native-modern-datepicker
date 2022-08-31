import type {FunctionComponent} from 'react';
import type { StyleProp, ViewStyle } from "react-native";

declare const ModernDatePicker:FunctionComponent
export default ModernDatePicker
export declare function getFormatedDate(date?: Date, format?: string):string
export declare function getToday():string

export interface ModernDatePickerProps {
  /** Gets called when selected value changes */
  onSelectedChange: (dateString: string) => void
  /** Gets called when month changes */
  onMonthYearChange: (dateString: string) => void
  /** Gets called when time changes */
  onTimeChange: (dateString: string) => void
  /** Gets called when date changes */
  onDateChange: (dateString: string) => void

  /** Initially visible month */
  current: string
  /** The primary value of the date picker */
  selected: string
  /** Specifies the minimum selectable day by user */
  minimumDate: string
  /** Specifies the maximum selectable day by user */
  maximumDate: string
  
  /** The minimum selectable year when user opens the year selector */
  selectorStartingYear: number
  /** The maxium selectable year when user opens the year selector */
  selectorEndingYear: number
  
  /** Disable month & year from being changed */
  disableDateChange: boolean
  /** Switches between 'Gregorian' & 'Jalaali' mode */
  isGregorian: boolean
  
  /** Customizing date picker style */
  options: Partial<ModernDatePickerOptions>
  
  mode: 'datepicker' | 'calendar' | 'monthYear' | 'time'
  
  minuteInterval: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 | 60 
  
  /** Changes date picker container style */
  style: StyleProp<ViewStyle>
}

export interface ModernDatePickerOptions {
  textHeaderColor: string
  textDefaultColor: string
  selectedTextColor: string
  mainColor: string
  textSecondaryColor: string
  borderColor: string
  defaultFont: string
  headerFont: string
  textFontSize: number
  textHeaderFontSize: number
  headerAnimationDistance: number
  daysAnimationDistance: number
}
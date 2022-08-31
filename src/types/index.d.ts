import type {FunctionComponent} from 'react';
import type { StyleProp, ViewStyle } from "react-native";

declare const ModernDatePicker:FunctionComponent
export default ModernDatePicker
export declare function getFormatedDate(date?: Date, format?: string):string
export declare function getToday():string

export interface ModernDatePickerProps {
  onSelectedChange: (dateString: string) => void
  onMonthYearChange: (dateString: string) => void
  onTimeChange: (dateString: string) => void
  onDateChange: (dateString: string) => void

  current: string
  selected: string
  minimumDate: string
  maximumDate: string

  selectorStartingYear: number
  selectorEndingYear: number

  disableDateChange: boolean
  isGregorian: boolean

  options: Partial<ModernDatePickerOptions>

  mode: 'datepicker' | 'calendar' | 'monthYear' | 'time'

  minuteInterval: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 | 60 

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
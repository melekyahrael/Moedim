/**
 * Mo'edim Type Definitions
 * 364-Day Calendar System
 */

export interface MoedimDate {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  weekday: number; // 0-6 (0=Sunday, 6=Sabbath)
  isMarkerDay: boolean;
}

export interface GregorianDate {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
}

export interface CalendarYear {
  year: number;
  months: CalendarMonth[];
}

export interface CalendarMonth {
  month: number;
  year: number;
  days: CalendarDay[];
  daysInMonth: number;
}

export interface CalendarDay {
  moedimDate: MoedimDate;
  gregorianDate: GregorianDate;
  isToday: boolean;
  isSabbath: boolean;
  isMarkerDay: boolean;
  feastCodes: string[];
}

export interface Feast {
  code: string;
  name: string;
  hebrewName: string;
  month: number;
  startDay: number;
  duration: number;
  category: 'spring' | 'summer' | 'fall';
  scriptureRefs: string[];
  description: string;
  observanceNotes: string;
}

export type YearAnchor = 'modern' | 'creation' | 'exodus' | 'qumran';

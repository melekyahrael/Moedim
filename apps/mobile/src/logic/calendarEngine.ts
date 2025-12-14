/**
 * Mo'edim Calendar Engine
 * 364-Day Solar Calendar System
 *
 * CORE PRINCIPLES:
 * - 364 days = 52 perfect weeks
 * - 12 months in 30/30/31 pattern per quarter
 * - 4 marker days (intercalary) at months 3, 6, 9, 12
 * - Weekly Sabbath cycle NEVER breaks
 * - Anchor: March 20, 2025 = Year 1, Month 1, Day 1 (Day 4 of week)
 */

import { MoedimDate, GregorianDate, CalendarMonth, CalendarDay } from '../types';

/**
 * Constants
 */
export const DAYS_PER_YEAR = 364;
export const WEEKS_PER_YEAR = 52;
export const MONTHS_PER_YEAR = 12;
export const DAYS_PER_WEEK = 7;
export const DAYS_PER_QUARTER = 91; // 30 + 30 + 31

/**
 * Month structure: 30, 30, 31 pattern repeats 4 times
 */
const MONTH_LENGTHS: number[] = [
  30, 30, 31, // Q1
  30, 30, 31, // Q2
  30, 30, 31, // Q3
  30, 30, 31  // Q4
];

/**
 * Marker days occur on day 31 of months 3, 6, 9, 12
 */
const MARKER_DAY_MONTHS = [3, 6, 9, 12];

/**
 * Epoch anchor: March 20, 2025 (Gregorian) = Moedim Year 1, Month 1, Day 1
 * This was Day 4 of the week (Wednesday)
 */
const EPOCH_GREGORIAN = new Date('2025-03-20T00:00:00Z');
const EPOCH_MOEDIM_YEAR = 1;
const EPOCH_MOEDIM_MONTH = 1;
const EPOCH_MOEDIM_DAY = 1;
const EPOCH_WEEKDAY = 3; // Wednesday (0=Sun, 3=Wed)

/**
 * Get the number of days in a Moedim month
 */
export function getDaysInMonth(month: number): number {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Must be 1-12.`);
  }
  return MONTH_LENGTHS[month - 1];
}

/**
 * Check if a day is a marker day
 */
export function isMarkerDay(month: number, day: number): boolean {
  return MARKER_DAY_MONTHS.includes(month) && day === 31;
}

/**
 * Calculate day of year from Moedim date
 */
export function getDayOfYear(month: number, day: number): number {
  let dayOfYear = 0;
  for (let m = 1; m < month; m++) {
    dayOfYear += getDaysInMonth(m);
  }
  dayOfYear += day;
  return dayOfYear;
}

/**
 * Calculate weekday index (0=Sunday, 6=Saturday/Sabbath)
 * In Mo'edim, the weekly cycle never breaks
 */
export function getWeekday(year: number, month: number, day: number): number {
  const yearsSinceEpoch = year - EPOCH_MOEDIM_YEAR;
  const daysSinceEpochYear = getDayOfYear(month, day) - 1; // -1 because epoch is day 1
  const totalDaysSinceEpoch = (yearsSinceEpoch * DAYS_PER_YEAR) + daysSinceEpochYear;

  return (EPOCH_WEEKDAY + totalDaysSinceEpoch) % DAYS_PER_WEEK;
}

/**
 * Convert Gregorian date to Moedim date
 */
export function gregorianToMoedim(gregorian: Date): MoedimDate {
  // Calculate days since epoch
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSinceEpoch = Math.floor((gregorian.getTime() - EPOCH_GREGORIAN.getTime()) / msPerDay);

  // Calculate year
  const yearsSinceEpoch = Math.floor(daysSinceEpoch / DAYS_PER_YEAR);
  const year = EPOCH_MOEDIM_YEAR + yearsSinceEpoch;

  // Calculate day of year (1-364)
  const dayOfYear = (daysSinceEpoch % DAYS_PER_YEAR) + 1;

  // Calculate month and day
  let remainingDays = dayOfYear;
  let month = 1;

  for (let m = 1; m <= 12; m++) {
    const daysInMonth = getDaysInMonth(m);
    if (remainingDays <= daysInMonth) {
      month = m;
      break;
    }
    remainingDays -= daysInMonth;
  }

  const day = remainingDays;
  const weekday = getWeekday(year, month, day);

  return {
    year,
    month,
    day,
    weekday,
    isMarkerDay: isMarkerDay(month, day)
  };
}

/**
 * Convert Moedim date to Gregorian date
 */
export function moedimToGregorian(moedim: MoedimDate): GregorianDate {
  const yearsSinceEpoch = moedim.year - EPOCH_MOEDIM_YEAR;
  const dayOfYear = getDayOfYear(moedim.month, moedim.day);
  const totalDaysSinceEpoch = (yearsSinceEpoch * DAYS_PER_YEAR) + (dayOfYear - 1);

  const msPerDay = 1000 * 60 * 60 * 24;
  const gregorianMs = EPOCH_GREGORIAN.getTime() + (totalDaysSinceEpoch * msPerDay);
  const gregorianDate = new Date(gregorianMs);

  return {
    year: gregorianDate.getUTCFullYear(),
    month: gregorianDate.getUTCMonth() + 1,
    day: gregorianDate.getUTCDate()
  };
}

/**
 * Get today's Moedim date
 */
export function getToday(): MoedimDate {
  return gregorianToMoedim(new Date());
}

/**
 * Get next Sabbath from a given Moedim date
 */
export function getNextSabbath(from: MoedimDate): MoedimDate {
  const currentWeekday = from.weekday;
  const daysUntilSabbath = (6 - currentWeekday + 7) % 7;

  if (daysUntilSabbath === 0 && from.weekday === 6) {
    // Already on Sabbath, get next week's
    return addDays(from, 7);
  }

  return addDays(from, daysUntilSabbath);
}

/**
 * Add days to a Moedim date
 */
export function addDays(date: MoedimDate, days: number): MoedimDate {
  const gregorian = moedimToGregorian(date);
  const gregorianDate = new Date(Date.UTC(gregorian.year, gregorian.month - 1, gregorian.day));
  gregorianDate.setUTCDate(gregorianDate.getUTCDate() + days);

  return gregorianToMoedim(gregorianDate);
}

/**
 * Generate calendar month
 */
export function generateMonth(year: number, month: number): CalendarMonth {
  const daysInMonth = getDaysInMonth(month);
  const days: CalendarDay[] = [];
  const today = getToday();

  for (let day = 1; day <= daysInMonth; day++) {
    const moedimDate: MoedimDate = {
      year,
      month,
      day,
      weekday: getWeekday(year, month, day),
      isMarkerDay: isMarkerDay(month, day)
    };

    const gregorianDate = moedimToGregorian(moedimDate);

    const isToday =
      moedimDate.year === today.year &&
      moedimDate.month === today.month &&
      moedimDate.day === today.day;

    days.push({
      moedimDate,
      gregorianDate,
      isToday,
      isSabbath: moedimDate.weekday === 6,
      isMarkerDay: moedimDate.isMarkerDay,
      feastCodes: [] // Will be populated by feast engine
    });
  }

  return {
    month,
    year,
    days,
    daysInMonth
  };
}

/**
 * Validate calendar structure (for testing)
 */
export function validateCalendar(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Test 1: Year length
  const totalDays = MONTH_LENGTHS.reduce((sum, days) => sum + days, 0);
  if (totalDays !== DAYS_PER_YEAR) {
    errors.push(`Year length is ${totalDays}, expected ${DAYS_PER_YEAR}`);
  }

  // Test 2: Weeks per year
  if (DAYS_PER_YEAR % DAYS_PER_WEEK !== 0) {
    errors.push(`Year doesn't divide evenly into weeks`);
  }

  // Test 3: Marker days
  for (const markerMonth of MARKER_DAY_MONTHS) {
    if (getDaysInMonth(markerMonth) !== 31) {
      errors.push(`Month ${markerMonth} should have 31 days for marker day`);
    }
  }

  // Test 4: Quarter structure
  for (let q = 0; q < 4; q++) {
    const start = q * 3;
    const quarterDays = MONTH_LENGTHS.slice(start, start + 3).reduce((sum, d) => sum + d, 0);
    if (quarterDays !== DAYS_PER_QUARTER) {
      errors.push(`Quarter ${q + 1} has ${quarterDays} days, expected ${DAYS_PER_QUARTER}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

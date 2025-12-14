/**
 * Mo'edim Calendar Engine Tests
 * These tests are NON-NEGOTIABLE - they protect the core
 */

import {
  DAYS_PER_YEAR,
  WEEKS_PER_YEAR,
  DAYS_PER_QUARTER,
  getDaysInMonth,
  isMarkerDay,
  getDayOfYear,
  getWeekday,
  gregorianToMoedim,
  moedimToGregorian,
  getNextSabbath,
  validateCalendar
} from '../src/logic/calendarEngine';

describe('Calendar Engine - Core Structure', () => {
  test('Year length equals exactly 364 days', () => {
    expect(DAYS_PER_YEAR).toBe(364);
  });

  test('Year equals exactly 52 weeks', () => {
    expect(WEEKS_PER_YEAR).toBe(52);
    expect(DAYS_PER_YEAR / 7).toBe(52);
  });

  test('Month lengths sum to 364', () => {
    let total = 0;
    for (let month = 1; month <= 12; month++) {
      total += getDaysInMonth(month);
    }
    expect(total).toBe(364);
  });

  test('Each quarter equals 91 days (30 + 30 + 31)', () => {
    // Quarter 1
    expect(getDaysInMonth(1) + getDaysInMonth(2) + getDaysInMonth(3)).toBe(DAYS_PER_QUARTER);
    // Quarter 2
    expect(getDaysInMonth(4) + getDaysInMonth(5) + getDaysInMonth(6)).toBe(DAYS_PER_QUARTER);
    // Quarter 3
    expect(getDaysInMonth(7) + getDaysInMonth(8) + getDaysInMonth(9)).toBe(DAYS_PER_QUARTER);
    // Quarter 4
    expect(getDaysInMonth(10) + getDaysInMonth(11) + getDaysInMonth(12)).toBe(DAYS_PER_QUARTER);
  });

  test('Marker days fall on day 31 of months 3, 6, 9, 12', () => {
    expect(isMarkerDay(3, 31)).toBe(true);
    expect(isMarkerDay(6, 31)).toBe(true);
    expect(isMarkerDay(9, 31)).toBe(true);
    expect(isMarkerDay(12, 31)).toBe(true);

    // Non-marker months
    expect(isMarkerDay(1, 30)).toBe(false);
    expect(isMarkerDay(2, 30)).toBe(false);
  });

  test('Calendar structure validation passes', () => {
    const result = validateCalendar();
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

describe('Calendar Engine - Date Conversions', () => {
  test('Epoch date: March 20, 2025 → Year 1, Month 1, Day 1', () => {
    const gregorian = new Date('2025-03-20T00:00:00Z');
    const moedim = gregorianToMoedim(gregorian);

    expect(moedim.year).toBe(1);
    expect(moedim.month).toBe(1);
    expect(moedim.day).toBe(1);
  });

  test('Round-trip conversion: Gregorian → Moedim → Gregorian', () => {
    const originalDate = new Date('2025-06-15T00:00:00Z');
    const moedim = gregorianToMoedim(originalDate);
    const backToGregorian = moedimToGregorian(moedim);

    const original = {
      year: originalDate.getUTCFullYear(),
      month: originalDate.getUTCMonth() + 1,
      day: originalDate.getUTCDate()
    };

    expect(backToGregorian).toEqual(original);
  });

  test('Multiple round-trip conversions across years', () => {
    const testDates = [
      '2025-03-20', // Epoch
      '2025-12-31',
      '2026-01-15',
      '2026-06-21', // Summer solstice
      '2027-03-20', // One year later
      '2030-01-01'
    ];

    testDates.forEach(dateStr => {
      const original = new Date(dateStr + 'T00:00:00Z');
      const moedim = gregorianToMoedim(original);
      const backToGregorian = moedimToGregorian(moedim);

      expect(backToGregorian.year).toBe(original.getUTCFullYear());
      expect(backToGregorian.month).toBe(original.getUTCMonth() + 1);
      expect(backToGregorian.day).toBe(original.getUTCDate());
    });
  });
});

describe('Calendar Engine - Weekly Cycle', () => {
  test('Epoch day (March 20, 2025) is Day 4 (Wednesday)', () => {
    const moedim = gregorianToMoedim(new Date('2025-03-20T00:00:00Z'));
    expect(moedim.weekday).toBe(3); // 0=Sun, 3=Wed
  });

  test('Same calendar date has same weekday every year', () => {
    // Month 1, Day 1 should always be the same weekday
    const year1 = getWeekday(1, 1, 1);
    const year2 = getWeekday(2, 1, 1);
    const year3 = getWeekday(3, 1, 1);

    expect(year1).toBe(year2);
    expect(year2).toBe(year3);
  });

  test('52 Sabbaths per year, all on weekday 6', () => {
    let sabbathCount = 0;

    for (let month = 1; month <= 12; month++) {
      const daysInMonth = getDaysInMonth(month);
      for (let day = 1; day <= daysInMonth; day++) {
        const weekday = getWeekday(1, month, day);
        if (weekday === 6) {
          sabbathCount++;
        }
      }
    }

    expect(sabbathCount).toBe(52);
  });

  test('Get next Sabbath works correctly', () => {
    // From a Wednesday (day 3)
    const wednesday = { year: 1, month: 1, day: 1, weekday: 3, isMarkerDay: false };
    const nextSabbath = getNextSabbath(wednesday);
    expect(nextSabbath.weekday).toBe(6);

    // From a Sabbath, get next week's Sabbath
    const sabbath = { year: 1, month: 1, day: 4, weekday: 6, isMarkerDay: false };
    const followingSabbath = getNextSabbath(sabbath);
    expect(followingSabbath.weekday).toBe(6);
    expect(followingSabbath.day).toBe(11);
  });
});

describe('Calendar Engine - Day of Year', () => {
  test('First day of year is day 1', () => {
    expect(getDayOfYear(1, 1)).toBe(1);
  });

  test('Last day of year is day 364', () => {
    expect(getDayOfYear(12, 31)).toBe(364);
  });

  test('Day of year calculations are correct', () => {
    // Month 1, Day 30
    expect(getDayOfYear(1, 30)).toBe(30);

    // Month 2, Day 1
    expect(getDayOfYear(2, 1)).toBe(31);

    // Month 3, Day 31 (first marker day, end of Q1)
    expect(getDayOfYear(3, 31)).toBe(91);

    // Month 7, Day 1 (start of Q3)
    expect(getDayOfYear(7, 1)).toBe(183);
  });
});

describe('Calendar Engine - Edge Cases', () => {
  test('Invalid month throws error', () => {
    expect(() => getDaysInMonth(0)).toThrow();
    expect(() => getDaysInMonth(13)).toThrow();
  });

  test('Handles dates far in the future', () => {
    const futureDate = new Date('2100-01-01T00:00:00Z');
    const moedim = gregorianToMoedim(futureDate);
    const backToGregorian = moedimToGregorian(moedim);

    expect(backToGregorian.year).toBe(2100);
  });

  test('Handles dates far in the past (before epoch)', () => {
    const pastDate = new Date('2020-01-01T00:00:00Z');
    const moedim = gregorianToMoedim(pastDate);

    expect(moedim.year).toBeLessThan(1); // Negative years before epoch
  });
});

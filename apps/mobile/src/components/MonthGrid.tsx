import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { generateMonth } from '../logic/calendarEngine';
import { MoedimDate, CalendarDay } from '../types';
import { DayCell } from './DayCell';
import { Feast } from '../services/feastService';

interface MonthGridProps {
  year: number;
  month: number;
  feasts?: Feast[];
  onDayPress?: (date: MoedimDate) => void;
}

const WEEKDAY_NAMES = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Sabbath'];

export function MonthGrid({ year, month, feasts = [], onDayPress }: MonthGridProps) {
  const calendarMonth = generateMonth(year, month);
  const days = calendarMonth.days;

  // Check if a specific day is a feast day
  const isFeastDay = (moedimDate: MoedimDate): boolean => {
    return feasts.some(
      feast =>
        feast.month === moedimDate.month &&
        feast.start_day <= moedimDate.day &&
        moedimDate.day < feast.start_day + (feast.duration || 1)
    );
  };

  // Get feast for a specific day
  const getFeastForDay = (moedimDate: MoedimDate): Feast | undefined => {
    return feasts.find(
      feast =>
        feast.month === moedimDate.month &&
        feast.start_day <= moedimDate.day &&
        moedimDate.day < feast.start_day + (feast.duration || 1)
    );
  };

  // Group days into weeks (7 days per row)
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <View style={styles.container}>
      {/* Weekday header */}
      <View style={styles.weekdayHeader}>
        {WEEKDAY_NAMES.map((name, index) => (
          <View key={index} style={styles.weekdayCell}>
            <Text style={[styles.weekdayText, index === 6 && styles.sabbathHeaderText]}>
              {name}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.grid}>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.week}>
            {week.map((day, dayIndex) => {
              const isFeast = isFeastDay(day.moedimDate);
              const feast = getFeastForDay(day.moedimDate);

              return (
                <DayCell
                  key={dayIndex}
                  date={day.moedimDate}
                  isFeast={isFeast}
                  feast={feast}
                  onPress={onDayPress}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  weekdayHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
  },
  sabbathHeaderText: {
    color: '#d4af37',
  },
  grid: {
    gap: 4,
  },
  week: {
    flexDirection: 'row',
    gap: 4,
  },
});

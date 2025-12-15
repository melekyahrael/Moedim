import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MonthNavigationProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const MONTH_NAMES = [
  'Month 1',
  'Month 2',
  'Month 3',
  'Month 4',
  'Month 5',
  'Month 6',
  'Month 7',
  'Month 8',
  'Month 9',
  'Month 10',
  'Month 11',
  'Month 12',
];

export function MonthNavigation({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onToday,
}: MonthNavigationProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevMonth} style={styles.navButton}>
        <Text style={styles.navButtonText}>‹</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onToday} style={styles.centerButton}>
        <Text style={styles.monthText}>{MONTH_NAMES[month - 1]}</Text>
        <Text style={styles.yearText}>Year {year}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNextMonth} style={styles.navButton}>
        <Text style={styles.navButtonText}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  navButton: {
    padding: 8,
    width: 40,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  centerButton: {
    flex: 1,
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  yearText: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
});

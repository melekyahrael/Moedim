import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MoedimDate } from '../types';

interface DayCellProps {
  date: MoedimDate;
  isFeast?: boolean;
  feast?: any; // Will be typed properly when we integrate Supabase
  onPress?: (date: MoedimDate) => void;
}

export function DayCell({ date, isFeast = false, feast, onPress }: DayCellProps) {
  const isSabbath = date.weekday === 6;
  const isToday = checkIsToday(date);

  const handlePress = () => {
    if (onPress) {
      onPress(date);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isSabbath && styles.sabbathCell,
        date.isMarkerDay && styles.markerCell,
        isFeast && styles.feastCell,
        isToday && styles.todayCell,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Day number */}
        <Text
          style={[
            styles.dayNumber,
            isSabbath && styles.sabbathText,
            isFeast && styles.feastText,
            isToday && styles.todayText,
          ]}
        >
          {date.day}
        </Text>

        {/* Indicators */}
        <View style={styles.indicators}>
          {date.isMarkerDay && (
            <View style={styles.markerDot} />
          )}
          {isFeast && feast && (
            <Text style={styles.feastIndicator} numberOfLines={1}>
              {feast.name_hebrew ? feast.name_hebrew.substring(0, 2) : '🎺'}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Helper function to check if date is today
function checkIsToday(date: MoedimDate): boolean {
  const now = new Date();
  const { gregorianToMoedim } = require('../logic/calendarEngine');
  const today = gregorianToMoedim(now);

  return (
    date.year === today.year &&
    date.month === today.month &&
    date.day === today.day
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  sabbathCell: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  markerCell: {
    borderColor: '#4a90e2',
    borderWidth: 2,
  },
  feastCell: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderColor: '#d4af37',
  },
  todayCell: {
    borderColor: '#ffffff',
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  sabbathText: {
    color: '#d4af37',
  },
  feastText: {
    color: '#d4af37',
    fontWeight: 'bold',
  },
  todayText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    minHeight: 12,
  },
  markerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4a90e2',
  },
  feastIndicator: {
    fontSize: 8,
    color: '#d4af37',
    fontWeight: 'bold',
  },
});

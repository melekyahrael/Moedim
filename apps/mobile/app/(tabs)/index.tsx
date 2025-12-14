import { View, Text, StyleSheet } from 'react-native';
import { getToday } from '../../src/logic/calendarEngine';
import { useEffect, useState } from 'react';
import type { MoedimDate } from '../../src/types';

export default function TodayScreen() {
  const [today, setToday] = useState<MoedimDate | null>(null);

  useEffect(() => {
    setToday(getToday());
  }, []);

  if (!today) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mo'edim Calendar</Text>

      <View style={styles.dateCard}>
        <Text style={styles.label}>Today</Text>
        <Text style={styles.date}>
          Year {today.year}, Month {today.month}, Day {today.day}
        </Text>
        <Text style={styles.weekday}>
          Day {today.weekday + 1} of the week
          {today.weekday === 6 && ' (Sabbath)'}
        </Text>
        {today.isMarkerDay && (
          <Text style={styles.marker}>📍 Marker Day</Text>
        )}
      </View>

      <Text style={styles.subtitle}>
        364-Day Covenant Calendar
      </Text>
      <Text style={styles.info}>
        52 Perfect Weeks • Fixed Solar Structure
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 40,
  },
  dateCard: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d4af37',
    marginBottom: 30,
    minWidth: 300,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  date: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  weekday: {
    fontSize: 16,
    color: '#d4af37',
  },
  marker: {
    fontSize: 14,
    color: '#d4af37',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#888',
  },
});

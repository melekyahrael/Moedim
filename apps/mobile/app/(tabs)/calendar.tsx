import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { getToday } from '../../src/logic/calendarEngine';
import { MoedimDate } from '../../src/types';
import { MonthGrid } from '../../src/components/MonthGrid';
import { MonthNavigation } from '../../src/components/MonthNavigation';
import { getAllFeasts, Feast } from '../../src/services/feastService';

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState<MoedimDate | null>(null);
  const [feasts, setFeasts] = useState<Feast[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize with today's date
  useEffect(() => {
    const today = getToday();
    setCurrentDate(today);
    loadFeasts();
  }, []);

  // Load feasts from Supabase
  const loadFeasts = async () => {
    setLoading(true);
    const data = await getAllFeasts();
    setFeasts(data);
    setLoading(false);
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    if (!currentDate) return;

    let newMonth = currentDate.month - 1;
    let newYear = currentDate.year;

    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    setCurrentDate({
      ...currentDate,
      month: newMonth,
      year: newYear,
    });
  };

  // Navigate to next month
  const handleNextMonth = () => {
    if (!currentDate) return;

    let newMonth = currentDate.month + 1;
    let newYear = currentDate.year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    setCurrentDate({
      ...currentDate,
      month: newMonth,
      year: newYear,
    });
  };

  // Navigate back to today
  const handleToday = () => {
    const today = getToday();
    setCurrentDate(today);
  };

  if (!currentDate) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading calendar...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MonthNavigation
        year={currentDate.year}
        month={currentDate.month}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <Text style={styles.loadingText}>Loading feasts...</Text>
        ) : (
          <MonthGrid
            year={currentDate.year}
            month={currentDate.month}
            feasts={feasts}
            onDayPress={(date) => {
              // TODO: Navigate to day detail view
              console.log('Day pressed:', date);
            }}
          />
        )}

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Legend</Text>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'rgba(212, 175, 55, 0.3)' }]} />
            <Text style={styles.legendText}>Sabbath</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: 'rgba(212, 175, 55, 0.2)', borderColor: '#d4af37' }]} />
            <Text style={styles.legendText}>Feast Day</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { borderColor: '#4a90e2', borderWidth: 2 }]} />
            <Text style={styles.legendText}>Marker Day</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { borderColor: '#ffffff', borderWidth: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />
            <Text style={styles.legendText}>Today</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 32,
  },
  legend: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 12,
    backgroundColor: '#1a1a1a',
  },
  legendText: {
    fontSize: 14,
    color: '#ffffff',
  },
});

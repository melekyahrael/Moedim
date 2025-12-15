import { supabase } from './supabase';
import { Tables } from '../types/supabase';

export type Feast = Tables<'feast_content'>;

/**
 * Fetch all biblical feasts from Supabase
 */
export async function getAllFeasts(): Promise<Feast[]> {
  console.log('=== ENV DEBUG ===');
  console.log('URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
  console.log('KEY length:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.length);
  console.log('KEY preview:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20));

  const { data, error } = await supabase
    .from('feast_content')
    .select('*')
    .order('month', { ascending: true })
    .order('start_day', { ascending: true });

  if (error) {
    console.error('Error fetching feasts:', error);
    return [];
  }

  return data || [];
}

/**
 * Get feasts for a specific month
 */
export function getFeastsForMonth(feasts: Feast[], month: number): Feast[] {
  return feasts.filter(feast => feast.month === month);
}

/**
 * Check if a day is a feast day
 */
export function isFeastDay(feasts: Feast[], month: number, day: number): boolean {
  return feasts.some(feast => {
    const startDay = feast.start_day;
    const endDay = startDay + (feast.duration || 1) - 1;
    return feast.month === month && day >= startDay && day <= endDay;
  });
}

/**
 * Get the current year's feasts
 * In a real app, this would be based on the current Moedim year
 */
export async function getCurrentYearFeasts(): Promise<Feast[]> {
  // For now, just get all feasts
  // Later we can filter by year when we add year field to the database
  return getAllFeasts();
}

/**
 * Get feast details by ID
 */
export async function getFeastById(id: string): Promise<Feast | null> {
  const { data, error } = await supabase
    .from('feast_content')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching feast:', error);
    return null;
  }

  return data;
}

/**
 * Get feast for a specific day
 */
export function getFeastForDay(feasts: Feast[], month: number, day: number): Feast | null {
  return feasts.find(feast => {
    const startDay = feast.start_day;
    const endDay = startDay + (feast.duration || 1) - 1;
    return feast.month === month && day >= startDay && day <= endDay;
  }) || null;
}

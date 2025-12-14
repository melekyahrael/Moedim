import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: () => null, // Will add icons later
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="feasts"
        options={{
          title: 'Feasts',
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}

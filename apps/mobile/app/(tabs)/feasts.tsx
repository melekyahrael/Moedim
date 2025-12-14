import { View, Text, StyleSheet } from 'react-native';

export default function FeastsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biblical Feasts</Text>
      <Text style={styles.subtitle}>12 Appointed Times</Text>
      <Text style={styles.info}>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    color: '#888',
  },
});

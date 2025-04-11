import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';

interface GameControlsProps {
  onMove: (direction: string) => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onMove }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable
          style={styles.button}
          onPressIn={() => onMove('up')}
        >
          <Text style={styles.icon}>⬆️</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          style={styles.button}
          onPressIn={() => onMove('left')}
        >
          <Text style={styles.icon}>⬅️</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPressIn={() => onMove('right')}
        >
          <Text style={styles.icon}>➡️</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          style={styles.button}
          onPressIn={() => onMove('down')}
        >
          <Text style={styles.icon}>⬇️</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    fontSize: 24,
  },
});

export default GameControls;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface WinScreenProps {
  moves: number;
  onSave: (name: string) => void;
  onClose: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ moves, onSave, onClose }) => {
  const [name, setName] = useState<string>('');

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
    }
  };

  return (
    <View style={styles.winContainer}>
      <Text style={styles.winText}>Победа!</Text>
      <Text style={styles.movesText}>Ходов: {moves}</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Введите имя"
        placeholderTextColor="#666"
        onChangeText={setName}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleSave} style={[styles.btn, styles.saveBtn]}>
          <Text style={styles.btnText}>Сохранить</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={[styles.btn, styles.closeBtn]}>
          <Text style={styles.btnText}>Закрыть</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  winContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#222',
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  winText: {
    color: '#4CAF50',
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  movesText: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btn: {
    padding: 15,
    borderRadius: 10,
    width: '48%',
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
  },
  closeBtn: {
    backgroundColor: '#666',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default WinScreen; 
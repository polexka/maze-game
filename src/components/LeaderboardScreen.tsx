import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getLeaderboard } from '../utils/storageUtils';

interface LeaderboardScreenProps {
  onClose: () => void; // Определяем тип для пропса onClose
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onClose }) => {
  const [leaderboard, setLeaderboard] = useState<{ name: string; moves: number; id: string }[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    const scores = await getLeaderboard();
    setLeaderboard(scores);
  };

  const renderItem = ({ item, index }: { item: { name: string; moves: number; id: string }; index: number }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.rank}>#{index + 1}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.moves}>{item.moves} ходов</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Таблица рекордов</Text>
      <FlatList
        data={leaderboard}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Закрыть</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    color: '#4CAF50',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    maxHeight: 300,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  rank: {
    color: '#4CAF50',
    fontSize: 18,
    width: 40,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
  },
  moves: {
    color: '#fff',
    fontSize: 18,
    width: 80,
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LeaderboardScreen;
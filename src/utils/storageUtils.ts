import AsyncStorage from '@react-native-async-storage/async-storage';

interface Score {
  name: string;
  moves: number;
  gridSize: number;
  id: string;
}

export const saveScore = async (name: string, moves: number, gridSize: number): Promise<boolean> => {
  try {
    const savedLeaderboard = await AsyncStorage.getItem('leaderboard');
    const leaderboard: Score[] = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];
    
    const newScore: Score = { 
      name: name.trim(), 
      moves,
      gridSize,
      id: Date.now().toString() 
    };
    
    const updated = [...leaderboard, newScore]
      .sort((a, b) => a.moves - b.moves)
      .slice(0, 10);
    
    await AsyncStorage.setItem('leaderboard', JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error saving score:', error);
    return false;
  }
};

export const getLeaderboard = async (): Promise<Score[]> => {
  try {
    const savedLeaderboard = await AsyncStorage.getItem('leaderboard');
    return savedLeaderboard ? JSON.parse(savedLeaderboard) : [];
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }
};
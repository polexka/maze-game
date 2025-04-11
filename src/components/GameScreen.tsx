import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import GameGrid from '../components/GameGrid';
import GameControls from '../components/GameControls';
import WinScreen from '../components/WinScreen';
import LeaderboardScreen from '../components/LeaderboardScreen';
import { generateGridSize, generatePositions, generateObstacles } from '../utils/gameUtils';
import { saveScore } from '../utils/storageUtils';

interface Position {
  row: number;
  col: number;
}

export default function GameScreen() {
  const [gridSize, setGridSize] = useState<{ rows: number; cols: number }>({ rows: 11, cols: 11 });
  const [playerPosition, setPlayerPosition] = useState<Position>({ row: 0, col: 0 });
  const [goalPosition, setGoalPosition] = useState<Position>({ row: 0, col: 0 });
  const [obstacles, setObstacles] = useState<Position[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [showWinScreen, setShowWinScreen] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('');

  useEffect(() => {
    resetLevel();
  }, []);

  const resetLevel = () => {
    const newGridSize = generateGridSize();
    const { start, goal } = generatePositions(newGridSize);
    const newObstacles = generateObstacles(newGridSize, start, goal);
    
    console.log('New level:', {
      gridSize: newGridSize,
      start,
      goal,
      obstacles: newObstacles
    });
    
    setGridSize(newGridSize);
    setPlayerPosition(start);
    setGoalPosition(goal);
    setObstacles(newObstacles);
    setMoves(0);
    setShowWinScreen(false);
  };

  const movePlayer = (direction: string) => {
    const newPosition = { ...playerPosition };
    
    switch (direction) {
      case 'up':
        newPosition.row = Math.max(0, playerPosition.row - 1);
        break;
      case 'down':
        newPosition.row = Math.min(gridSize.rows - 1, playerPosition.row + 1);
        break;
      case 'left':
        newPosition.col = Math.max(0, playerPosition.col - 1);
        break;
      case 'right':
        newPosition.col = Math.min(gridSize.cols - 1, playerPosition.col + 1);
        break;
    }

    // Проверяем, не является ли новая позиция препятствием
    const isObstacle = obstacles.some(
      obstacle => obstacle.row === newPosition.row && obstacle.col === newPosition.col
    );

    if (!isObstacle) {
      setPlayerPosition(newPosition);
      setMoves(prevMoves => prevMoves + 1);
      
      // Проверяем, достиг ли игрок цели
      if (newPosition.row === goalPosition.row && newPosition.col === goalPosition.col) {
        console.log('Цель достигнута!');
        setShowWinScreen(true);
      }
    }
  };

  const handleWin = async (name: string) => {
    setPlayerName(name);
    await saveScore(name, moves, gridSize.rows);
    setShowWinScreen(false);
    setShowLeaderboard(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gameContainer}>
          <GameGrid
            gridSize={gridSize}
            playerPosition={playerPosition}
            goalPosition={goalPosition}
            obstacles={obstacles}
          />
          <GameControls onMove={movePlayer} />
        </View>
      </ScrollView>
      {showWinScreen && (
        <View style={styles.overlay}>
          <WinScreen
            moves={moves}
            onSave={handleWin}
            onClose={() => {
              setShowWinScreen(false);
              resetLevel();
            }}
          />
        </View>
      )}
      {showLeaderboard && (
        <View style={styles.overlay}>
          <LeaderboardScreen onClose={() => {
            setShowLeaderboard(false);
            resetLevel();
          }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
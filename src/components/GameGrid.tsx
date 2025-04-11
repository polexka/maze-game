import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import GameCell from './GameCell';

const { width } = Dimensions.get('window');

interface GameGridProps {
  gridSize: {
    rows: number;
    cols: number;
  };
  playerPosition: {
    row: number;
    col: number;
  };
  goalPosition: {
    row: number;
    col: number;
  };
  obstacles: Array<{ row: number; col: number }>;
}

const GameGrid: React.FC<GameGridProps> = ({ gridSize, playerPosition, goalPosition, obstacles }) => {
  // Рассчитываем размер ячейки на основе размера сетки
  const maxSize = Math.max(gridSize.rows, gridSize.cols);
  const CELL_SIZE = Math.min(width - 40, 400) / maxSize;

  console.log('GameGrid render:', {
    gridSize,
    playerPosition,
    goalPosition,
    obstacles,
    CELL_SIZE
  });

  return (
    <View style={styles.grid}>
      {[...Array(gridSize.rows)].map((_, row) => (
        <View key={row} style={styles.row}>
          {[...Array(gridSize.cols)].map((_, col) => {
            const isPlayer = playerPosition.row === row && playerPosition.col === col;
            const isGoal = goalPosition.row === row && goalPosition.col === col;
            const isObstacle = obstacles.some(o => o.row === row && o.col === col);

            // Проверяем, что клетка правильно определяется
            if (isPlayer && isGoal) {
              console.log('Найдена клетка с игроком и целью:', { row, col });
            }

            // Отладочная информация для каждой клетки
            if (isPlayer || isGoal) {
              console.log(`Cell (${row},${col}):`, {
                isPlayer,
                isGoal,
                isObstacle,
                playerPos: playerPosition,
                goalPos: goalPosition
              });
            }

            return (
              <GameCell
                key={`${row},${col}`}
                isPlayer={isPlayer}
                isGoal={isGoal}
                isObstacle={isObstacle}
                size={CELL_SIZE}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    marginVertical: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default GameGrid;
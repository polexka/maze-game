import React from 'react';
import { View, StyleSheet } from 'react-native';

interface GameCellProps {
  isPlayer: boolean;
  isGoal: boolean;
  isObstacle: boolean;
  size: number;
}

const GameCell: React.FC<GameCellProps> = ({ isPlayer, isGoal, isObstacle, size }) => {
  // Определяем цвет клетки
  let backgroundColor = '#fff'; // Белый по умолчанию

  if (isObstacle) {
    backgroundColor = '#666'; // Серый для препятствий
  } else if (isGoal) {
    backgroundColor = '#4CAF50'; // Зеленый для цели
  } else if (isPlayer) {
    backgroundColor = '#FFC107'; // Желтый для игрока
  }

  // Отладочная информация
  if (isPlayer || isGoal) {
    console.log('GameCell render:', {
      isPlayer,
      isGoal,
      isObstacle,
      backgroundColor
    });
  }

  return (
    <View
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          backgroundColor
        }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    margin: 1,
    borderRadius: 4
  }
});

export default GameCell;
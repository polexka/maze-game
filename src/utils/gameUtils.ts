import { getRandomPattern } from './obstaclePatterns';

interface GridSize {
  rows: number;
  cols: number;
}

interface Position {
  row: number;
  col: number;
}

// Функция для генерации размера поля
export const generateGridSize = (): GridSize => {
  // Фиксированный размер 11x11
  return {
    rows: 11,
    cols: 11
  };
};

// Функция для генерации случайных позиций
export const generatePositions = (gridSize: GridSize): { start: Position; goal: Position } => {
  let start: Position, goal: Position;
  
  // Генерируем начальную позицию (в левом верхнем углу)
  start = {
    row: 0,
    col: 0
  };

  // Генерируем конечную позицию (в правом нижнем углу)
  goal = {
    row: gridSize.rows - 1,
    col: gridSize.cols - 1
  };

  return { start, goal };
};

// Функция для проверки, является ли клетка защищенной
const isProtectedCell = (row: number, col: number, start: Position, goal: Position, gridSize: GridSize): boolean => {
  // Защищаем клетки вокруг старта
  if (Math.abs(row - start.row) <= 1 && Math.abs(col - start.col) <= 1) {
    return true;
  }
  
  // Защищаем клетки вокруг цели
  if (Math.abs(row - goal.row) <= 1 && Math.abs(col - goal.col) <= 1) {
    return true;
  }
  
  // Защищаем диагональные пути от старта к цели
  if (row === col || row === (gridSize.rows - 1 - col)) {
    return true;
  }
  
  // Защищаем вертикальный и горизонтальный пути
  if (row === 0 || row === gridSize.rows - 1 || col === 0 || col === gridSize.cols - 1) {
    return true;
  }
  
  return false;
};

// Функция для генерации случайных препятствий
export const generateObstacles = (gridSize: GridSize, start: Position, goal: Position): Position[] => {
  const obstacles: Position[] = [];
  
  // Получаем случайный паттерн препятствий
  const possibleObstacles = getRandomPattern();
  
  // Создаем Set для отслеживания уникальных позиций
  const uniquePositions = new Set<string>();
  
  // Добавляем препятствия, избегая стартовой и конечной позиций
  for (let i = 0; i < possibleObstacles.length; i++) {
    const obstacle = possibleObstacles[i];
    
    // Проверяем, что позиция в пределах поля
    if (obstacle.row >= 0 && obstacle.row < gridSize.rows &&
        obstacle.col >= 0 && obstacle.col < gridSize.cols) {
      
      // Создаем уникальный ключ для позиции
      const positionKey = `${obstacle.row},${obstacle.col}`;
      
      // Проверяем, что позиция уникальна и не совпадает со стартом или целью
      if (!uniquePositions.has(positionKey) &&
          !(obstacle.row === start.row && obstacle.col === start.col) &&
          !(obstacle.row === goal.row && obstacle.col === goal.col)) {
        
        obstacles.push(obstacle);
        uniquePositions.add(positionKey);
      }
    }
  }
  
  return obstacles;
};
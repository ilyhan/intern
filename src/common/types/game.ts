type Position = 'left-up' | 'left-down' | 'right-up' | 'right-down';

type Eag = {
  position: Position; // позиця яйца
  step: number; // 1-4 - на доске, 5 - в полете, 6 - в корзине, 7 - разбито
};

type GameMode = 'A' | 'B';

type Game = {
  mode: GameMode;
  score: number; // счет игры
  heart: number; // количество оставшихся жизней
  wolv: Position; // позиция волка
  eags: Array<Eag>; // генерируемые яйца
};

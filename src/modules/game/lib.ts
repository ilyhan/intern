export const wolvSrc: Record<Position, string> = {
  'left-up': '/assets/wolves/wolf-left-up.png',
  'left-down': '/assets/wolves/wolf-left-down.png',
  'right-up': '/assets/wolves/wolf-right-up.png',
  'right-down': '/assets/wolves/wolf-right-down.png',
};

export const scenerySrc = '/assets/game/scenery.svg';
export const eggSrc = '/assets/game/egg.png';
export const brokenEggSrc = '/assets/game/egg-broken.png';

export const chickenSrc: Record<Position, string> = {
  'left-up': '/assets/game/chicken-left-up.png',
  'left-down': '/assets/game/chicken-left-down.png',
  'right-up': '/assets/game/chicken-right-up.png',
  'right-down': '/assets/game/chicken-right-down.png',
};

type Point = { x: number; y: number };

export const lanes: Position[] = ['left-up', 'left-down', 'right-up', 'right-down'];

const leftUp: Point[] = [
  { x: 8.5, y: 30 },
  { x: 14.5, y: 34.3 },
  { x: 20.4, y: 38.5 },
  { x: 26.4, y: 42.8 },
  { x: 36, y: 50 },
  { x: 39, y: 60 },
  { x: 39, y: 89 },
];
const leftDown: Point[] = [
  { x: 8.5, y: 53 },
  { x: 14.5, y: 56.4 },
  { x: 20.4, y: 59.8 },
  { x: 26.4, y: 63.2 },
  { x: 36, y: 70 },
  { x: 39, y: 77 },
  { x: 39, y: 89 },
];

export const eggPositions: Record<Position, Point[]> = {
  'left-up': leftUp,
  'left-down': leftDown,
  'right-up': leftUp.map(({ x, y }) => ({ x: 100 - x, y })),
  'right-down': leftDown.map(({ x, y }) => ({ x: 100 - x, y })),
};

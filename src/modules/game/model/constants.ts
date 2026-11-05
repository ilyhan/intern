export const INITIAL_GAME: Game = {
  mode: 'A',
  wolv: 'left-down',
  score: 0,
  heart: 3,
  eags: [],
};

export const INITIAL_PLAY = false;
export const INITIAL_STEPS_UNTIL_SPAWN = 0;
export const GAME_STEP_INTERVAL: Record<GameMode, number> = {
  A: 500,
  B: 300,
};
export const EGG_SPAWN_INTERVAL_STEPS = 4;
export const EGG_POSITIONS: Position[] = ['left-up', 'left-down', 'right-up', 'right-down'];
export const DEFAULT_EGG_POSITION: Position = 'right-down';
export const EGG_INITIAL_STEP = 1;
export const EGG_CATCH_STEP = 6;
export const EGG_BROKEN_STEP = 7;
export const EGG_REMOVE_STEP = 8;
export const SCORE_PER_EGG = 1;
export const HEART_LOSS_PER_EGG = 1;
export const MIN_HEART = 0;
export const MISS_PAUSE_DURATION = 1000;
export const EGG_ROLL_SOUND = '/assets/sounds/egg-roll.wav';
export const EGG_CATCH_SOUND = '/assets/sounds/egg-catch.wav';
export const RECORD_STORAGE_KEY = 'nu-pogodi-record';
export const KEYBOARD_POSITIONS: Partial<Record<string, Position>> = {
  KeyW: 'left-up',
  KeyS: 'left-down',
  KeyE: 'right-up',
  KeyD: 'right-down',
};

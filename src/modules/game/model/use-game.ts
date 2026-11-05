import { useEffect, useRef, useState } from 'react';
import {
  INITIAL_GAME,
  INITIAL_PLAY,
  INITIAL_STEPS_UNTIL_SPAWN,
  GAME_STEP_INTERVAL,
  EGG_SPAWN_INTERVAL_STEPS,
  EGG_POSITIONS,
  EGG_INITIAL_STEP,
  EGG_CATCH_STEP,
  EGG_BROKEN_STEP,
  MISS_PAUSE_DURATION,
  EGG_ROLL_SOUND,
  EGG_CATCH_SOUND,
  SCORE_PER_EGG,
  HEART_LOSS_PER_EGG,
  MIN_HEART,
  KEYBOARD_POSITIONS,
} from './constants';
import { useRecord } from './use-record';

export const useGame = () => {
  const [game, setGame] = useState<Game>(INITIAL_GAME);
  const [play, setPlay] = useState(INITIAL_PLAY);
  const [recovering, setRecovering] = useState(false);
  const record = useRecord(game.score);
  const stepsUntilSpawn = useRef(INITIAL_STEPS_UNTIL_SPAWN);
  const sounds = useRef<{ roll: HTMLAudioElement; catch: HTMLAudioElement } | null>(null);

  const changePosition = (wolv: Position) => {
    setGame((prev) => ({ ...prev, wolv }));
  };

  const startGame = (mode: GameMode) => {
    setGame({ ...INITIAL_GAME, mode });
    stepsUntilSpawn.current = INITIAL_STEPS_UNTIL_SPAWN;
    setRecovering(false);
    setPlay(true);
  };

  useEffect(() => {
    const audio = { roll: new Audio(EGG_ROLL_SOUND), catch: new Audio(EGG_CATCH_SOUND) };
    sounds.current = audio;
    return () => {
      audio.roll.pause();
      audio.catch.pause();
    };
  }, []);

  const playSound = (type: 'roll' | 'catch') => {
    const sound = sounds.current?.[type];
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  };

  const gameStep = () => {
    const eags: Eag[] = [];
    let caught = 0;

    game.eags.forEach((egg) => {
      if (egg.position === game.wolv && egg.step === EGG_CATCH_STEP) {
        caught += 1;
      } else {
        eags.push({ ...egg, step: egg.step + 1 });
      }
    });

    if (caught) playSound('catch');
    const score = game.score + caught * SCORE_PER_EGG;
    const brokenEgg = eags.find((egg) => egg.step === EGG_BROKEN_STEP);

    if (brokenEgg) {
      setGame({ ...game, score, heart: Math.max(MIN_HEART, game.heart - HEART_LOSS_PER_EGG), eags: [brokenEgg] });
      stepsUntilSpawn.current = INITIAL_STEPS_UNTIL_SPAWN;
      setRecovering(true);
      return;
    }

    if (eags.length) playSound('roll');
    if (stepsUntilSpawn.current === 0) {
      const position = EGG_POSITIONS[Math.floor(Math.random() * EGG_POSITIONS.length)];
      eags.push({ position, step: EGG_INITIAL_STEP });
      stepsUntilSpawn.current = EGG_SPAWN_INTERVAL_STEPS;
    }

    stepsUntilSpawn.current -= 1;
    setGame({ ...game, score, eags });
  };

  const gameStepRef = useRef(gameStep);
  useEffect(() => {
    gameStepRef.current = gameStep;
  });

  useEffect(() => {
    if (game.heart <= MIN_HEART) {
      setPlay(false);
      return;
    }
    if (!play || recovering) return;

    const interval = setInterval(() => gameStepRef.current(), GAME_STEP_INTERVAL[game.mode]);

    return () => clearInterval(interval);
  }, [play, recovering, game.mode, game.heart]);

  useEffect(() => {
    if (!recovering) return;

    const timeout = setTimeout(() => {
      setGame((prev) => ({ ...prev, eags: [] }));
      setRecovering(false);
    }, MISS_PAUSE_DURATION);

    return () => clearTimeout(timeout);
  }, [recovering]);

  useEffect(() => {
    if (!play || recovering || game.heart <= MIN_HEART) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      )
        return;

      const position = KEYBOARD_POSITIONS[event.code];

      if (!position) return;

      event.preventDefault();
      changePosition(position);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [play, recovering, game.heart]);

  return { game, play, record, changePosition, changePlay: setPlay, startGame };
};

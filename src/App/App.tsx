import { Console } from '../modules/console';
import style from './App.module.less';
import { Game } from '../modules/game';
import { useGame } from '../modules/game/model/use-game';
import { useEffect, useState } from 'react';

export const App = () => {
  const { game, record, changePosition, changePlay, startGame } = useGame();
  const [started, setStarted] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const gameOver = game.heart === 0;

  useEffect(() => {
    if (gameOver) setModalOpen(true);
  }, [gameOver]);

  const handleStart = (mode: GameMode) => {
    setStarted(true);
    setModalOpen(false);
    startGame(mode);
  };

  const handlePlay = (nextPlay: boolean) => {
    changePlay(nextPlay);
    setModalOpen(!nextPlay);
  };

  const closeModal = () => {
    setModalOpen(false);
    if (started && !gameOver) changePlay(true);
  };

  return (
    <div className={style.app}>
      <Console onChange={changePosition} onPlay={handlePlay} onStart={handleStart}>
        <Game
          {...game}
          modal={{
            open: modalOpen,
            record,
            onClose: closeModal,
          }}
        />
      </Console>
    </div>
  );
};

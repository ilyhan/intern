import clsx from 'clsx';
import { brokenEggSrc, chickenSrc, eggPositions, eggSrc, lanes, scenerySrc, wolvSrc } from './lib';
import style from './style.module.less';
import { INITIAL_GAME } from './model/constants';
import type { ComponentProps } from 'react';
import { WelcomeModal } from './ui/welcome-modal';

type GameProps = Game & {
  modal: ComponentProps<typeof WelcomeModal>;
};

export const Game = ({ wolv, eags, heart, score, mode, modal }: GameProps) => (
  <div className={style.game}>
    <WelcomeModal {...modal} />
    <div className={style.header}>
      <span className={style.name}>НУ, ПОГОДИ!</span>
      <div className={style.counter}>
        <span className={style.caption}>СЧЁТ</span>
        <span className={style.score}>{String(score).padStart(4, '0')}</span>
      </div>
      <div className={style.lives}>
        <span className={style.caption}>ЖИЗНИ</span>
        <div className={style.lifeIcons}>
          {Array.from({ length: INITIAL_GAME.heart }, (_, life) => (
            <img key={life} src={eggSrc} className={clsx(style.life, life >= heart && style.lost)} />
          ))}
        </div>
      </div>
    </div>

    <img className={style.scenery} src={scenerySrc} />

    {lanes.map((lane) => (
      <img key={lane} src={chickenSrc[lane]} className={clsx(style.chicken, style[lane])} />
    ))}

    <img className={style.wolf} src={wolvSrc[wolv]} />

    {eags.map(({ position, step }, index) => {
      const point = eggPositions[position][step - 1];
      if (!point) return null;

      const broken = step >= 7;
      const direction = position.startsWith('left') ? 1 : -1;
      const rotation = broken ? 0 : direction * (step - 1) * 28;

      return (
        <img
          key={`${position}-${index}`}
          src={broken ? brokenEggSrc : eggSrc}
          className={clsx(style.egg, broken && style.broken)}
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        />
      );
    })}

    <div className={style.footer}>
      <span className={mode !== 'A' ? style.lost : undefined}>ИГРА А</span>
      <span className={mode !== 'B' ? style.lost : undefined}>ИГРА Б</span>
    </div>
  </div>
);

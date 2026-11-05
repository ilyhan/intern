import { Button } from '../../common/ui/button';
import style from './style.module.less';
import type { ReactNode } from 'react';

type ConsoleProps = {
  onChange: (_: Position) => void;
  onPlay: (_: boolean) => void;
  onStart: (_: GameMode) => void;
  children?: ReactNode;
};

export const Console = ({ children, onChange, onPlay, onStart }: ConsoleProps) => {
  return (
    <div className={style.console}>
      <div className={style.leftControls}>
        <div className={style.upperLeft}>
          <Button type="round" onClick={() => onChange('left-up')} />
        </div>
        <div className={style.lowerLeft}>
          <Button type="round" onClick={() => onChange('left-down')} />
        </div>
      </div>
      <div className={style.frame}>
        <p className={style.title}>ИГРА НА ЭКРАНЕ</p>
        <div className={style.screen}>{children}</div>
        <p className={style.title}>ЭЛЕКТРОНИКА</p>
      </div>
      <div className={style.modes}>
        <Button label="ИГРА А" onClick={() => onStart('A')} />
        <Button label="ИГРА Б" onClick={() => onStart('B')} />
        <Button label="ПАУЗА" onClick={() => onPlay(false)} />
      </div>
      <div className={style.rightControls}>
        <div className={style.upperRight}>
          <Button type="round" onClick={() => onChange('right-up')} />
        </div>
        <div className={style.lowerRight}>
          <Button type="round" onClick={() => onChange('right-down')} />
        </div>
      </div>
    </div>
  );
};

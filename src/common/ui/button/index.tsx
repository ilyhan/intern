import clsx from 'clsx';
import style from './style.module.less';

type ButtonProps = {
  onClick?: () => void;
  label?: string;
  type?: 'round' | 'oval';
};

export const Button = ({ onClick, label, type = 'oval' }: ButtonProps) => {
  return (
    <div className={style.wrapper}>
      <button type="button" onClick={onClick} className={clsx(style.button, style[type])}></button>
      {label && <p>{label}</p>}
    </div>
  );
};

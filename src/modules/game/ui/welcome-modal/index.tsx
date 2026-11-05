import { useEffect, useRef } from 'react';
import { INITIAL_GAME } from '../../model/constants';
import style from './style.module.less';

type WelcomeModalProps = {
  open: boolean;
  record: number;
  onClose: () => void;
};

export const WelcomeModal = ({ open, record, onClose }: WelcomeModalProps) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  useEffect(() => {
    const element = dialog.current;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    element?.addEventListener('cancel', handleCancel);
    return () => element?.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  return (
    <dialog ref={dialog} className={style.modal}>
      <p className={style.record}>Ваш рекорд: {record}</p>
      <p>
        Помогите волку поймать яйца. Нажимайте четыре красные кнопки, чтобы подставлять корзину под нужную дорожку.
        Можно управлять с клавиатуры: W — вверх влево, S — вниз влево, E — вверх вправо, D — вниз вправо.{' '}
        Пойманное яйцо приносит очко, разбитое отнимает жизнь. Всего жизней: {INITIAL_GAME.heart}. Для запуска нажмите
        «ИГРА А» или «ИГРА Б» на консоли. В игре Б яйца движутся быстрее.
      </p>
      <button className={style.close} onClick={onClose}>
        Понятно
      </button>
    </dialog>
  );
};

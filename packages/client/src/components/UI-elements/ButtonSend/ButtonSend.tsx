import { FC, SyntheticEvent } from 'react'
import styles from './ButtonSend.module.sass'

type ButtonSendProps = {
  type: 'button' | 'submit' | 'reset';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
}

export const ButtonSend: FC<ButtonSendProps> = (props) => {
  return (
    <button
      className={styles.buttonSend}
      {...props}
    > <div className={styles.buttonSend__icon}></div></button>
  )
}

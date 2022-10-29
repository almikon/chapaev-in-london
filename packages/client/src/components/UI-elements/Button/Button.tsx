import React, { SyntheticEvent } from 'react'
import styles from './Button.module.sass'

export interface IButtonInterface {
  type: 'secondary' | 'primary' | 'accent' | 'inactive'
  size: 'small' | 'medium' | 'large'
  value: string | number
  onClick?: (() => void) | ((e: SyntheticEvent) => void)
  name?: string
  disabled?: boolean
  id?: string
}

export function Button(props: IButtonInterface) {
  const buttonClassName = 'button'

  return (
    <button
      onClick={props.onClick}
      id={props.id}
      className={`${styles.button} 
        ${styles[`${buttonClassName}_${props.type}`]}
        ${styles[`${buttonClassName}_${props.size}`]}
      `}
      name={props.name}
      disabled={props.disabled}>
      {props.value}
    </button>
  )
}

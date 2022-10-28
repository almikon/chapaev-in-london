import React, { SyntheticEvent } from "react";
import styles from "./Button.module.sass"

export interface IButtonInterface {
  type: 'secondary' | 'primary' | 'accent' | 'inactive';
  size: 'small' | 'medium' | 'large';
  value: string | number;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  name?: string;
  disabled?: boolean;
  id?: string;
}

export function Button(props: IButtonInterface) {
  return (
    <button
      onClick={props.onClick}
      id={props.id}
      className={`${styles.button} 
        ${props.type === 'primary' && styles.button_primary}
        ${props.type === 'secondary' && styles.button_secondary}
        ${props.type === 'inactive' && styles.button_inactive}
        ${props.type === 'accent' && styles.button_accent}
        ${props.size === 'small' && styles.button_small}
        ${props.size === 'medium' && styles.button_medium}
        ${props.size === 'large' && styles.button_large}
      `}
      name={props.name}
      disabled={props.disabled}
    >
      {props.value}
    </button>
  )
}
import React, { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react'
import styles from './Input.module.sass'
import { VariantType } from '../../../types/htmlTag'

type InputProps = {
  type: HTMLInputTypeAttribute,
  variant: VariantType;
  id?: string;
  name: string;
  customModifier?: string;
  placeholder: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
}

export const Input: FC<InputProps> = (props) => {
  const { variant, customModifier, ...otherProps } = props

  const variantClassName = variant ? styles[`input_${variant}`] : ''
  const customModifierClassName = customModifier ? styles[`${customModifier}`] : ''

  const className = styles.input + ' ' + variantClassName + ' ' + customModifierClassName

  return (
      <input
          className={className}
          {...otherProps}
      />
  )
}

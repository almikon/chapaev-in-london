import React, { ReactNode } from 'react'
import styles from './Form.module.sass'

type FormProps = {
  children: ReactNode[]
  handlers: ReactNode[]
  title: string
  onSubmit: (event?: React.FormEvent<HTMLFormElement> | undefined) => void
}

export function Form(props: FormProps) {
  return (
    <form onSubmit={props.onSubmit}>
      <div className={styles.form}>
        <p className={styles.form__title}>{props.title}</p>
        <div className={styles.childrenAndHandlers}>
          <div className={styles.form__children}>{props.children}</div>
          <div className={styles.form__handlers}>{props.handlers}</div>
        </div>
      </div>
    </form>
  )
}

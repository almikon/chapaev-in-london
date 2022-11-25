import React, { SyntheticEvent } from "react";
import styles from "./Avatar.module.sass"

type AvatarProps = {
  size: 'small' | 'large'
  src: string
  alt: string
  type?: 'upload'
  onClick: (e: SyntheticEvent) => void
}

export function Avatar(props: AvatarProps) {
  if (props.src) {
    return (
      <img
        className={`${styles.avatar} ${styles[props.size]} ${props.type && styles.avatar_edit}`}
        alt={props.alt}
        src={props.src}
        onClick={props.onClick}
      />

    )
  }
  else {
    return <div
      className={`${styles.avatar} ${styles.avatar__noAvatar} ${styles.avatar_edit}`}
      onClick={props.onClick}
    ></div>
  }
}
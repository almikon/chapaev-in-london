import { FC } from 'react'
import styles from './Avatar.module.sass'

type AvatarProps = {
  src: string
}

export const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <>
      {
        src
          ? <img
            className={styles.avatar}
            src={src}
            alt='Аватарище' />
          : <div
            className={styles.avatar + ' ' + styles.avatar_default}
            />
      }
    </>
  )
}

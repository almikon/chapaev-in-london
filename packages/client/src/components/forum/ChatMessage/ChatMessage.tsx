import { FC } from 'react'
import { Message } from '../../../types/forumType'
import { Avatar } from '../../UI-elements/Avatar/Avatar'
import stores from '../../../store'
import styles from './ChatMessage.module.sass'

type ChatMessageProps = {
  message: Message
}

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const { user } = stores.authorization

  return (
    <li className={styles.chatMessage}>
      <Avatar src={user?.avatar ?? ''} />
      <div className={styles.chatMessage__content}>
        <p className={styles.chatMessage__login}>{message.user.login}</p>
        <p className={styles.chatMessage__text}>{message.content}</p>
        <p>{message.time}</p>
      </div>
    </li>
  )
}

import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import styles from './Forum.module.sass'
import stylesUI from '../../styles/styles.module.sass'
import { ChatsList } from '../../components/forum/ChatList/ChatsList'
import stores from '../../store'
import { Loader } from '../../components/UI-elements/Loader/Loader'

export const Forum: FC = observer(() => {
  const { isLoading } = stores.forumStore

  useEffect(() => {
    stores.forumStore.getChats()
  }, [])

  const className = styles.forum + ' ' + stylesUI.ui

  return (
    <div className={className}>
      {
        isLoading
          ? <Loader />
          : <ChatsList />
      }
    </div>
  )
})

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { ChatArea } from '../../../components/forum/ChatArea/ChatArea'
import stylesUI from '../../../styles/styles.module.sass'

export const Chat: FC = observer(() => {
  return (
    <div className={stylesUI.ui}>
      <ChatArea />
    </div>
  )
})


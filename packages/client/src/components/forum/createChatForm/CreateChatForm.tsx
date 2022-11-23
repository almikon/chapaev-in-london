import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react'
import { Avatar } from '../../UI-elements/Avatar/Avatar'
import stores from '../../../store'
import styles from './CreateChatForm.module.sass'
import stylesInput  from '../../UI-elements/Input/Input.module.sass'
import { Input } from '../../UI-elements/Input/Input'
import { ButtonSend } from '../../UI-elements/ButtonSend/ButtonSend'

type CreateChatFormProps = {
  handleForm: (title: string, message: string) => void
}

export const CreateChatForm: FC<CreateChatFormProps> = ({ handleForm }) => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (title && message) {
      handleForm(title, message)
    }
  }

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  return (
    <div className={styles.createChatForm}>
      <Avatar src={stores.authorization.user?.avatar ?? ''} />
      <form
        className={styles.createChatForm__form}
        onSubmit={handleSubmit}>
        <div className={styles.createChatForm__wrapperInput}>
          <Input
            type={'text'}
            variant={'primary'}
            placeholder={'Введите название чата'}
            name={'chatTitle'}
            value={title}
            onChange={handleChangeTitle}
          />

          <textarea
            className={stylesInput.input + ' ' + stylesInput.input_primary + ' ' + styles.createChatForm__message}
            onChange={handleChangeMessage}
            value={message}
            placeholder={'Введите сообщение'}
          />

        </div>

        <ButtonSend type={'submit'}/>
      </form>
    </div>
  )
}

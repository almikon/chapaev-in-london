import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import styles from './Chats.module.sass'
import { Input } from '../UI-elements/Input/Input'
import { Button } from '../UI-elements/Button/Button'
import Chats from '../../api/Chats'
import { apiPath } from '../../config'

export function ChatsExample() {
  const [title, setTitle] = useState('Как играть в эту ХХХХХ игру?')
  const [titleSearch, setTitleSearch] = useState('Как играть ')
  const [chatId, setChatId] = useState(971)

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const handleChangeTitleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleSearch(e.currentTarget.value)
  }

  const handleChangeChatId = (e: ChangeEvent<HTMLInputElement>) => {
    setChatId(Number(e.currentTarget.value))
  }

  const handleCreateChat = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const chatsApi = new Chats(apiPath)
    const createChat = await chatsApi.createChat({
      title,
    })
    console.log('createChat', createChat)
  }

  const handleSearchByTitle = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const chatsApi = new Chats(apiPath)
    const searchChat = await chatsApi.getChat({
      title: title.slice(0, 10),
      limit: '22',
    })
    console.log('searchChat', searchChat)
  }

  const handleGetChatUsers = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const chatsApi = new Chats(apiPath)
    const getChatUsers = await chatsApi.getChatUsers(chatId, {
      name: 'a',
    })
    console.log('getChatUsers', getChatUsers)
  }

  const handleDeleteChat = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const chatsApi = new Chats(apiPath)
    const deleteChat = await chatsApi.deleteChat({
      chatId,
    })

    console.log('deleteChat', deleteChat)
  }

  const handleGetTokenChat = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const chatsApi = new Chats(apiPath)
    const getToken = await chatsApi.getToken(chatId.toString())

    console.log('getToken', getToken)
  }

  // TODO add/delete user to chat
  return (
    <div className={styles.ui}>
      <div className={styles.form__background}>
        <Input
          type={'text'}
          placeholder={'Enter your first name'}
          name={'first_name'}
          label={'First name'}
          value={title}
          handleChange={handleChangeTitle}></Input>
        <Input
          type={'text'}
          placeholder={'Enter your second name'}
          name={'second_name'}
          label={'Искать по названию'}
          value={titleSearch}
          handleChange={handleChangeTitleSearch}></Input>
        <Input
          type={'number'}
          placeholder={'Enter your second name'}
          name={'chatId'}
          label={'chat id'}
          value={chatId}
          handleChange={handleChangeChatId}></Input>

        <Button
          type={'primary'}
          size={'medium'}
          value={'CREATE CHAT'}
          name={'button'}
          onClick={handleCreateChat}></Button>

        <Button
          type={'primary'}
          size={'medium'}
          value={'SEARCH CHAT'}
          name={'button'}
          onClick={handleSearchByTitle}></Button>
        <Button
          type={'primary'}
          size={'medium'}
          value={'DELETE CHAT'}
          name={'button'}
          onClick={handleDeleteChat}></Button>
        <Button
          type={'primary'}
          size={'medium'}
          value={'CET CHAT USERS'}
          name={'button'}
          onClick={handleGetChatUsers}></Button>
        <Button
          type={'primary'}
          size={'medium'}
          value={'CET TOKEN CHAT'}
          name={'button'}
          onClick={handleGetTokenChat}></Button>
      </div>
    </div>
  )
}

import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import styles from './Chats.module.sass'
import { Input } from '../../UI-elements/Input/Input'
import { Button } from '../../UI-elements/Button/Button'
import { apiService } from '../../../api/ApiService'
import { AddDeleteUserChatDto } from '../../../types/dto/chats.dto'

export function ChatsExample() {
  const [title, setTitle] = useState('Как играть в эту ХХХХХ игру?')
  const [titleSearch, setTitleSearch] = useState('Как играть ')
  const [chatId, setChatId] = useState(1360)
  const [userId, setUserId] = useState(60073)

  const chatsApi = apiService.getChatsApi()

  const handleChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(e.currentTarget.value))
  }

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
    const createChat = await chatsApi.createChat({
      title,
    })
    console.log('createChat', createChat)
  }

  const handleSearchByTitle = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const searchChat = await chatsApi.getChat({
      title: title.slice(0, 10),
      limit: 22,
    })
    console.log('searchChat', searchChat)
  }

  const handleGetChatUsers = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const getChatUsers = await chatsApi.getChatUsers(chatId, {
      name: 'a',
    })
    console.log('getChatUsers', getChatUsers)
  }

  const handleDeleteChat = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const deleteChat = await chatsApi.deleteChat({
      chatId,
    })

    console.log('deleteChat', deleteChat)
  }

  const handleGetTokenChat = async (e: SyntheticEvent) => {
    e.preventDefault()

    // Просто пример
    const getToken = await chatsApi.getToken(chatId.toString())

    console.log('getToken', getToken)
  }

  const handleAddChatUser = async (e: SyntheticEvent) => {
    e.preventDefault()

    const data: AddDeleteUserChatDto = {
      chatId,
      users: [userId],
    }

    // Просто пример
    const addUser = await chatsApi.addUserChat(data)

    console.log('addUser', addUser)
  }

  const handleDeleteChatUser = async (e: SyntheticEvent) => {
    e.preventDefault()

    const data: AddDeleteUserChatDto = {
      chatId,
      users: [userId],
    }

    // Просто пример
    const addUser = await chatsApi.deleteUserChat(data)

    console.log('addUser', addUser)
  }

  // TODO add/delete user to chat
  return (
    <div className={styles.ui}>
      <div className={styles.form__background}>
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your first name'}
          name={'first_name'}
          label={'First name'}
          value={title}
          onChange={handleChangeTitle}/>
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your second name'}
          name={'second_name'}
          label={'Искать по названию'}
          value={titleSearch}
          onChange={handleChangeTitleSearch}/>
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your second name'}
          name={'chatId'}
          label={'chat id'}
          value={chatId.toString()}
          onChange={handleChangeChatId}/>

        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your second name'}
          name={'user ID'}
          label={'user id'}
          value={userId.toString()}
          onChange={handleChangeUserId}/>

        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'CREATE CHAT'}
          name={'button'}
          onClick={handleCreateChat}/>

        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'SEARCH CHAT'}
          name={'button'}
          onClick={handleSearchByTitle}/>
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'DELETE CHAT'}
          name={'button'}
          onClick={handleDeleteChat}/>
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'CET CHAT USERS'}
          name={'button'}
          onClick={handleGetChatUsers}/>
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'CET TOKEN CHAT'}
          name={'button'}
          onClick={handleGetTokenChat}/>

        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'ADD USER IN CHAT'}
          name={'button'}
          onClick={handleAddChatUser}/>

        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'DELETE USER IN CHAT'}
          name={'button'}
          onClick={handleDeleteChatUser}/>
      </div>
    </div>
  )
}

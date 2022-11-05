import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import styles from './leaderboard.module.sass'
import { Input } from '../UI-elements/Input/Input'
import { Button } from '../UI-elements/Button/Button'
import { apiService } from '../../api/ApiService'
import {
  AddLeaderboardDto,
  GetAllLeaderboardDto,
  GetTeamLeaderboardDto,
} from '../../types/dto/leaderboard.dto'

export function LeaderboardExample() {
  const [title, setTitle] = useState('Как играть в эту ХХХХХ игру?')
  const [userId, setUserId] = useState(60073)
  const [login, setLogin] = useState('anton71')

  const [ratingFieldName, setRatingFieldName] = useState('win')
  const [teamName, setTeamName] = useState('testTeam')

  const leaderboardApi = apiService.getLeaderboardApi()

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
  }

  const handleRatingFieldName = (e: ChangeEvent<HTMLInputElement>) => {
    setRatingFieldName(e.currentTarget.value)
  }

  const handleTeamName = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.currentTarget.value)
  }

  const handleChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(e.currentTarget.value))
  }

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const handleAddUserLeaderboard = async (e: SyntheticEvent) => {
    e.preventDefault()

    const data: AddLeaderboardDto = {
      data: {
        id: userId,
        win: 7,
      },
      ratingFieldName,
      teamName,
    }

    // Просто пример
    const addUserLeaderboard = await leaderboardApi.addUser(data)

    console.log('addUserLeaderboard', addUserLeaderboard)
  }

  const handleGetAllLeaderboard = async (e: SyntheticEvent) => {
    e.preventDefault()

    const data: GetAllLeaderboardDto = {
      limit: 100,
      ratingFieldName,
      cursor: 0,
    }

    // Просто пример
    const getAllLeaderboard = await leaderboardApi.getAllLeaderboard(data)

    console.log('getAllLeaderboard', getAllLeaderboard)
  }

  const handleGetTeamLeaderboard = async (e: SyntheticEvent) => {
    e.preventDefault()

    const data: GetTeamLeaderboardDto = {
      limit: 10,
      ratingFieldName,
      cursor: 0,
    }

    // Просто пример
    const getTeamLeaderboard = await leaderboardApi.getTeamLeaderboard(
      data,
      teamName
    )

    console.log('getTeamLeaderboard', getTeamLeaderboard)
  }

  // TODO add/delete user to chat
  return (
    <div className={styles.ui}>
      <div className={styles.form__background}>
        <Input
          type={'text'}
          placeholder={'Enter login'}
          name={'login'}
          variant={'primary'}
          label={'Login'}
          value={login}
          onChange={handleChangeLogin}/>
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
          placeholder={'Enter your first name'}
          name={'userID'}
          label={'User ID'}
          value={userId.toString()}
          onChange={handleChangeUserId}/>
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your first name'}
          name={'ratingFieldName'}
          label={'ratingFieldName'}
          value={ratingFieldName}
          onChange={handleRatingFieldName}/>
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your first name'}
          name={'teamName'}
          label={'teamName'}
          value={teamName}
          onChange={handleTeamName}/>

        <Button
          type={'button'}
          size={'medium'}
          variant={'primary'}
          value={'ADD USER to leaderboard'}
          name={'button'}
          onClick={handleAddUserLeaderboard}/>
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'GET ALL USER IN LEADERBOARD'}
          name={'button'}
          onClick={handleGetAllLeaderboard}/>
        <Button
          type={'button'}
          variant={'primary'}
          size={'medium'}
          value={'GET team LEADERBOARD'}
          name={'button'}
          onClick={handleGetTeamLeaderboard}/>
      </div>
    </div>
  )
}

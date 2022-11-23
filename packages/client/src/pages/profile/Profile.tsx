import React, { useEffect, useState } from 'react'
import styles from './Profile.module.sass'
import { observer } from "mobx-react-lite";
import { ChangePassword } from "./components/ChangePassword";
import { ChangeData } from "./components/ChangeData";


export const Profile = observer(({store}: Record<string, any>) => {
  const userData = store.user
  const [changeDataOrPassword, setChangeDataOrPassword] = useState('data' as 'data' | 'password')

  const toggleDataOrPassword = () => {
    changeDataOrPassword === 'data'
      ? setChangeDataOrPassword('password')
      : setChangeDataOrPassword('data')
  }

  useEffect(() => {
   setChangeDataOrPassword('data')
  }, [userData])

  return (
    <div className={styles.profile}>

      {userData !== null && changeDataOrPassword === 'data' &&
         <ChangeData
             userData={userData}
             handleChangePasswordButtonClick={toggleDataOrPassword}/>
      }

      {userData !== null && changeDataOrPassword === 'password' &&
        <ChangePassword
            handleChangePasswordButtonClick={toggleDataOrPassword}/>
      }

      {!userData && 'Загрузка...'}

    </div>
  )
})
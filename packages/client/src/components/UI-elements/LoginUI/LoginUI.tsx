import { ChangeEvent, useEffect, useState } from "react";
import { Validation } from "../../../assets/validation";
import { Input } from "../Input/Input";

export function LoginUI({handleChangeLogin, login, loginError, setLoginError}:any){
  
  useEffect(() => {
    if (!login.match(Validation.LOGIN) && login.length > 0) {
      setLoginError(true)
    } else {
      setLoginError(false)
    }
},[login])

    return (
        <Input
            type={'text'}
            variant={'primary'}
            placeholder={'Enter login'}
            name={'login'}
            label={'Login'}
            value={login}
            onChange={handleChangeLogin}
            showErrorMessage={loginError}
            errorMessage={'Only English letters and digits. 3-20 symbols.'}
        />
    )
}
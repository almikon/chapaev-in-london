import React from "react";
import styles from "./UI.module.sass"
import { Input } from "../UI-elements/Input/Input";
import { Button } from "../UI-elements/Button/Button";

export function UI() {

  return (
    <div className={styles.ui}>
      <div className={styles.form__background}>
        <Input type={"text"} variant={"primary"} placeholder={"Enter your name"} name={"first_name"} label={"First name"}></Input>
        <Input type={"email"} variant={"primary"} placeholder={"Enter email"} name={"email"} label={"Email"}></Input>
        <Input type={"password"} variant={"primary"} placeholder={"Enter password"} name={"password"} label={"Password"}></Input>
        <Button type={"button"} variant={"primary"} size={"medium"} value={"Click me"} name={"button"}></Button>
      </div>
    </div>
  )
}
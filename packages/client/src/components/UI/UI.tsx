import React from "react";
import styles from "./UI.module.sass"
import { Input } from "../elements/Input/Input";
import { Button } from "../elements/Button/Button";

export function UI() {

  return (
    <div className={styles.ui}>
      <div className={styles.form__background}>
        <Input type={"text"} placeholder={"Enter your name"} name={"first_name"} label={"First name"}></Input>
        <Input type={"email"} placeholder={"Enter email"} name={"email"} label={"Email"}></Input>
        <Input type={"password"} placeholder={"Enter password"} name={"password"} label={"Password"}></Input>
        <Button type={"primary"} size={"medium"} value={"Click me"} name={"button"}></Button>
      </div>
    </div>
  )
}
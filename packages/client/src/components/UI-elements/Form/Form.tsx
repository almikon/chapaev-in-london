import { ReactNode, SyntheticEvent } from "react"
import styles from '../../../styles/styles.module.sass'

type Props = {
    children: ReactNode
    handleOnSubmit: (event : SyntheticEvent) => void
}

export function Form({children, handleOnSubmit}:Props){
    return (
        <div className={styles.form__background}>
            <form onSubmit={handleOnSubmit}>
                {children}
            </form>
        </div>
    )
}
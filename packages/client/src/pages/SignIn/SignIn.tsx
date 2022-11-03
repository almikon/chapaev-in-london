import styles from './SignIn.module.sass'
import { Form } from '../../components/UI-elements/Form/Form'
import { Input } from '../../components/UI-elements/Input/Input'
import { Button } from '../../components/UI-elements/Button/Button'

export function SignIn() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        CHAPAEV<br></br> in London
      </p>
      <Form
        title={'Sign in'}
        handlers={[
          <div key={Math.random()} className={styles.handlers_box}>
            <Button
              type={'button'}
              variant={'primary'}
              size={'medium'}
              value={'Sign in'}
              name={'button'}></Button>

            <p>
              <a href="#">Create an account</a>
            </p>
          </div>,
        ]}
        onSubmit={e => {
          e?.preventDefault()
          console.log('submit')
        }}>
        <Input
          type={'text'}
          variant={'primary'}
          placeholder={'Enter your login'}
          name={'login'}
          label={'login'}
        />
        <Input
          type={'password'}
          variant={'primary'}
          placeholder={'Enter your password'}
          name={'password'}
          label={'password'}
        />
      </Form>
    </div>
  )
}

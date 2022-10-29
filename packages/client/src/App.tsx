import styles from './App.module.sass'
import { UI } from './components/UI/UI'
import { LoginAuthExample } from './components/Example-auth/LoginAuthExample'

function App() {
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     console.log(data)
  //   }
  //
  //   fetchServerData()
  // }, [])
  return (
    <div className={styles.App}>
      Вот тут будет жить ваше приложение :)
      <div>
        <UI></UI>
        <LoginAuthExample />
      </div>
    </div>
  )
}

export default App

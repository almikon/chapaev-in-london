import { useEffect } from 'react'
import styles from './App.module.sass'
import { UI } from "./components/UI/UI";


function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className={styles.App}>Вот тут будет жить ваше приложение :)
      <div>
        <UI></UI>
      </div>
    </div>
  )
}

export default App

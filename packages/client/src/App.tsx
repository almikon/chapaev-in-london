import { useEffect } from 'react'
import './App.sass'
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
    <div className="App">Вот тут будет жить ваше приложение :)
      <div>
        <UI></UI>
      </div>
    </div>
  )
}

export default App

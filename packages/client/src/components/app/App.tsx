import React from 'react'

import styles from './App.module.sass'
import RoutesApp from '../routes/RoutesApp'
import { Nav } from '../nav/Nav'

function App() {

  return (
    <div className={styles.App}>
      <Nav />
      <RoutesApp />
    </div>
  )
}

export default App


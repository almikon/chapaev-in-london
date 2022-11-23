import React from 'react'

import styles from './App.module.sass'
import RoutesApp from '../routes/RoutesApp'
import { Nav } from '../nav/Nav'
import { startServiceWorker } from '../../services/ServiceWorker';

function App() {

  startServiceWorker(); 

  return (
    
    <div className={styles.App}>
      <Nav />
      <RoutesApp />
    </div>
  )
}

export default App


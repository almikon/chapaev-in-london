import React from 'react'

import styles from './App.module.sass'
import RoutesApp from '../routes/RoutesApp'
import { Nav } from '../nav/Nav'
import { ErrorBoundary } from '../errorBoundary/ErrorBoundary'

function App() {
  return (
    <div className={styles.App}>
      <Nav />
      <ErrorBoundary>
        <RoutesApp />
      </ErrorBoundary>
    </div>
  )
}

export default App


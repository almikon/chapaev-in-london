import { Route, Routes } from 'react-router-dom'
import React, { FC } from 'react'

import ProtectedRoute from './ProtectedRoute'
import routes from '../../assets/routes'

const RoutesApp: FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={`${index}-${route.path}`}
          path={route.path}
          element={route.isAuth
            ? <ProtectedRoute children={route.element} />
            : route.element}
        />
      ))}
    </Routes>
  )
}

export default RoutesApp

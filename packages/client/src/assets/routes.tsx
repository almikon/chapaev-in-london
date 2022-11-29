import { RoutePaths, RoutesType } from '../types/routes'
import React from 'react'
import { Forum } from '../pages/forum/Forum'
import { CreateChat } from '../pages/forum/createChat/CreateChat'
import { Chat } from '../pages/forum/chat/Chat'
import { Landing } from "../pages/landing/Landing";
import { SignUp } from "../pages/signup/SignUp";
import { SignIn } from "../pages/signin/SignIn";
import { Leaderboard } from '../pages/leaderboard/Leaderboard'
import { Game } from '../pages/game/Game';
import { Profile } from "../pages/profile/Profile";
import stores from '../store'

const routes: RoutesType[] = [
  {
    isAuth: false,
    path: RoutePaths.SIGN_UP,
    element: <SignUp />
  },
  {
    isAuth: false,
    path: RoutePaths.SIGN_IN,
    element: <SignIn />
  },
  {
    isAuth: true,
    path: RoutePaths.MAIN,
    element: <Landing />
  },
  {
    isAuth: true,
    path: RoutePaths.SETTINGS,
    element: <h1>Settings</h1>
  },
  {
    isAuth: true,
    path: RoutePaths.PROFILE,
    element: <Profile store={stores.authorization}/>
  },
  {
    isAuth: true,
    path: RoutePaths.FORUM,
    element: <Forum />,
    children: [
      {
        isAuth: true,
        path: RoutePaths.FORUM_CREATE_CHAT,
        element: <CreateChat />
      },
      {
        isAuth: true,
        path: RoutePaths.FORUM_CHAT,
        element: <Chat />
      },
    ]
  },
  {
    isAuth: true,
    path: RoutePaths.LEADERBOARD,
    element: <Leaderboard/>
  },
  {
    isAuth: true,
    path: RoutePaths.GAME,
    element: <Game/>
  },
  {
    isAuth: false,
    path: RoutePaths.UNKNOWN,
    element: <h1>Нет такой</h1>
  }
]

export default routes

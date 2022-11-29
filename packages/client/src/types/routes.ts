import { ReactElement } from 'react'

export enum RoutePaths {
  MAIN = '/',
  GAME= '/game',
  SIGN_UP = '/sign-up',
  SIGN_IN = '/sign-in',
  SETTINGS = '/settings',
  PROFILE = '/profile',
  FORUM = '/forum',
  CREATE_CHAT = 'create-chat',
  CHAT = 'chat',
  FORUM_CREATE_CHAT = 'forum/create-chat',
  FORUM_CHAT = 'forum/chat',
  LEADERBOARD = '/leaderboard',
  UNKNOWN = '*'
}

export type RoutesType = {
  isAuth: boolean,
  path: RoutePaths,
  element: ReactElement,
  children?: RoutesType[]
}

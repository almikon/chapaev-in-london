import { ReactElement } from 'react';

export enum RoutePaths {
  MAIN = '/',
  SIGN_UP = '/sign-up',
  SIGN_IN = '/sign-in',
  SETTINGS = '/settings',
  PROFILE = '/profile',
  FORUM = '/forum',
  LEADERBOARD = '/leaderboard',
  UNKNOWN = '*',
}

export type RoutesType = {
  isAuth: boolean;
  path: RoutePaths;
  element: ReactElement;
};

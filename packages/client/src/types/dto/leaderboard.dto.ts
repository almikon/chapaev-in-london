import { Cursor, Limit } from './commom.dto';
import { User } from './user.dto';

export type DataLeaderBoard = {
  data: Partial<User> & {
    [key: string]: string | number;
  };
};

export type TeamName = {
  teamName: string;
};

export type RatingFieldName = {
  ratingFieldName: string;
};

export type AddLeaderboardDto = DataLeaderBoard & TeamName & RatingFieldName;
export type GetAllLeaderboardDto = RatingFieldName & Limit & Cursor;
export type GetTeamLeaderboardDto = RatingFieldName & Limit & Cursor;

export type LeaderboardResponse = DataLeaderBoard[];

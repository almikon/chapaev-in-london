import { Cursor, Limit } from './commom.dto';

export type DataLeaderBoard = {
  data: {
    userId: number;
    score: number;
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

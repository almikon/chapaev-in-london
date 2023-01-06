import { Checker } from './Checker';

export class GameStepResult {
	public destroyedCheckers: Checker[] = [];
	public winnerId: number | null = null;
	public player1Score = 0;
	public player2Score = 0;
}

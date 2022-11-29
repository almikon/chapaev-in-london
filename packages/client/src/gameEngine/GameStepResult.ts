import { Checker } from './Checker';

export class GameStepResult {
	public destroyedCheckers: Checker[] = [];
	public winnerId: number | null = null;
}

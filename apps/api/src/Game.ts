import { WebSocket } from "ws";
import { MessageTypes } from "./utils/enums";

type CellValue = 0 | 1 | null;
type Row = [CellValue, CellValue, CellValue];
export type Matrix = [Row, Row, Row];

export default class Game {
	public player1: WebSocket;
	public player2: WebSocket;
	private nextChance: WebSocket;
	private matrix: Matrix;
	private startTime;
	private marks: [];
	private markCount;

	constructor(p1: WebSocket, p2: WebSocket) {
		this.player1 = p1;
		this.player2 = p2;
		this.nextChance = p1;
		this.matrix = [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];
		this.startTime = Date.now();
		this.marks = [];
		this.markCount = 0;
	}

	public mark(socket: WebSocket, { row, col }: { row: number; col: number }) {
		console.log("marking: ", { row, col });
		if (socket !== this.nextChance) return;

		if (this.nextChance === this.player1) {
			this.matrix[row][col] = 1;
			this.nextChance = this.player2;
		} else if (this.nextChance === this.player2) {
			this.matrix[row][col] = 0;
			this.nextChance = this.player1;
		}

		this.player1.send(
			JSON.stringify({
				type: MessageTypes.MATRIX,
				matrix: this.matrix,
			})
		);

		this.player2.send(
			JSON.stringify({
				type: MessageTypes.MATRIX,
				matrix: this.matrix,
			})
		);

		this.markCount++;
	}
}


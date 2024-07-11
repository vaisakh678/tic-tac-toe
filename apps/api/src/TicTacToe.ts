type CellValue = 0 | 1 | null;
type Row = [CellValue, CellValue, CellValue];
export type Matrix = [Row, Row, Row];

export class TicTacToe {
	matrix: Matrix;
	constructor(
		matrix: Matrix = [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		]
	) {
		this.matrix = matrix;
	}

	mark(row: number, col: number, type: 1 | 0) {
		if (row > 2 || row < 0) throw new Error("Invalid row mark!.");
		if (col > 2 || col < 0) throw new Error("Invalid col mark!.");
		this.matrix[row][col] = type;
	}

	isCompleted() {
		const m = this.matrix;
		for (let i = 0; i < 3; i++) {
			if (m[i][0] === m[i][1] && m[i][1] === m[i][2]) return m[i][0];
			if (m[0][i] === m[1][i] && m[1][i] === m[2][i]) return m[0][i];
		}
		if (m[0][0] === m[1][1] && m[1][1] === m[2][2]) return m[1][1];
		if (m[2][0] === m[1][1] && m[1][1] === m[0][2]) return m[1][1];
		return -1;
	}

	isDraw() {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (this.matrix[i][j] === null) return false;
			}
		}
		return true;
	}
}

const t = new TicTacToe([
	[1, 0, 1],
	[0, 0, 1],
	[0, 1, 0],
]);
console.log(t.isCompleted());


import React from "react";
import Round from "./ui/Round";
import Cross from "./ui/Cross";
import { Matrix } from "../utils/interfaces";

interface IBoardProps {
	markings: Matrix;
	onCheck?: ([row, col]: [row: number, col: number]) => void;
}

const Board: React.FC<IBoardProps> = ({ markings, onCheck }) => {
	return (
		<div className="board w-[400px] h-[400px]">
			{markings.map((rows, row_idx) => {
				return rows.map((cell, col_idx) => {
					return (
						<div
							className="cell cursor-pointer"
							key={`row-${row_idx}#col-{${col_idx}}`}
							onClick={() => {
								onCheck && onCheck([row_idx, col_idx]);
							}}
						>
							{cell === 0 ? <Round /> : null}
							{cell === 1 ? <Cross /> : null}
						</div>
					);
				});
			})}
		</div>
	);
};

export default Board;


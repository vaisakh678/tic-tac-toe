import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import { Matrix } from "./utils/interfaces";
import useSocket from "./hooks/useSocket";
import { Button } from "@mui/material";

const App: React.FC = () => {
	const socket = useSocket();
	const [gameStatus, setGameStatus] = useState<"INIT_GAME" | "WAITING_FOR_PLAYER" | "GAME_STARTED">("INIT_GAME");
	const [marks, setMarks] = useState<Matrix>(() => [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	]);

	useEffect(() => {
		if (!socket) return;
		socket.onmessage = (msg) => {
			const data = JSON.parse(msg.data);

			console.log("data:", data);
			switch (data.type) {
				case "MATRIX":
					setMarks(data.matrix);
					break;
				case "INIT_GAME":
					setGameStatus("INIT_GAME");
					break;
				case "WAITING_FOR_PLAYER":
					setGameStatus("WAITING_FOR_PLAYER");
					break;
				case "GAME_STARTED":
					setGameStatus("GAME_STARTED");
					break;
				default:
					console.log("Invalid type");
					console.log("data:", data);
					break;
			}
		};
	}, [socket]);

	return (
		<div className="min-h-screen w-screen flex flex-col items-center justify-center bg-slate-300">
			<Board
				onCheck={([row, col]) => {
					if (socket?.readyState) {
						socket.send(JSON.stringify({ type: "MARK", check: { row, col } }));
					}
				}}
				markings={marks}
			/>

			<Button
				onClick={() => {
					if (socket?.readyState) socket.send(JSON.stringify({ type: "INIT_GAME" }));
				}}
				variant="contained"
				sx={{ marginTop: 3 }}
				disabled={gameStatus !== "INIT_GAME"}
			>
				{gameStatus === "INIT_GAME" ? "Start Game" : null}
				{gameStatus === "WAITING_FOR_PLAYER" ? "Waiting for player!." : null}
				{gameStatus === "GAME_STARTED" ? "Game started!." : null}
			</Button>
		</div>
	);
};

export default App;


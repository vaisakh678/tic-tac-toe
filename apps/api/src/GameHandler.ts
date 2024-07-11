import { WebSocket } from "ws";
import Game from "./Game";
import { GAME_STATUS, MessageTypes } from "./utils/enums";

export default class GameHandler {
	games: Game[];
	private static instance: GameHandler;
	private pendingUser: WebSocket | null;
	private users: WebSocket[];

	private constructor() {
		this.games = [];
		this.users = [];
		this.pendingUser = null;
	}

	public static getInstance() {
		if (this.instance) return this.instance;
		return (this.instance = new GameHandler());
	}

	addPlayer(socket: WebSocket) {
		this.users.push(socket);
		this.handleMessage(socket);
	}

	removePlayer(socket: WebSocket) {
		this.users = this.users.filter((soc) => soc !== socket);
		console.log("player exited.");
	}

	handleMessage(socket: WebSocket) {
		socket.on("message", (data) => {
			const message = JSON.parse(data.toString());

			if (message.type === MessageTypes.INIT_GAME && socket !== this.pendingUser) {
				if (this.pendingUser === null) {
					this.pendingUser = socket;
					socket.send(JSON.stringify({ type: GAME_STATUS.WAITING_FOR_PLAYER }));
				} else {
					const game = new Game(this.pendingUser, socket);
					this.games.push(game);
					socket.send(JSON.stringify({ type: GAME_STATUS.GAME_STARTED }));
					this.pendingUser.send(JSON.stringify({ type: GAME_STATUS.GAME_STARTED }));
					this.pendingUser = null;
				}
			}

			if (message.type === MessageTypes.MARK) {
				const game = this.games.find((game) => game.player1 || game.player2);
				game?.mark(socket, message.check);
			}
		});
	}
}


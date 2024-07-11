import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import GameHandler from "./GameHandler";

const app = express();

const httpServer = app.listen(3000, () => {
	console.log("server is up!.");
});

const wss = new WebSocketServer({ server: httpServer });

const gameHandler = GameHandler.getInstance();

wss.on("connection", (ws) => {
	gameHandler.addPlayer(ws);

	// ws.on("message", (data, isBinary) => {
	// 	wss.clients.forEach((client) => {
	// 		if (client.readyState === WebSocket.OPEN) {
	// 			client.send(data, { binary: isBinary });
	// 		}
	// 	});
	// });

	ws.on("disconnect", (ws) => {
		gameHandler.removePlayer(ws);
	});
});


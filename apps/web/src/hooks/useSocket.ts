import { useEffect, useState } from "react";

const useSocket = () => {
	const [socket, setSocket] = useState<null | WebSocket>(null);
	useEffect(() => {
		const _socket = new WebSocket("ws://localhost:3000");
		_socket.onopen = () => {
			console.log("Connection established!.");
		};
		_socket.onerror = (error) => {
			console.error("WebSocket error:", error);
		};
		_socket.onclose = () => {
			console.log("Connection closed!.");
		};
		setSocket(_socket);
		return () => {
			_socket.close();
		};
	}, []);
	return socket;
};
export default useSocket;

